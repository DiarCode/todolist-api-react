import React from "react";
import { formatDate } from "../../utils/dateFormatter";
import { completeTodo } from "../../api/todos/todos";
import { useAppDispatch } from "../../hooks/redux.hooks";
import todosSliceActions from "../../store/slices/todosTasksSlice";

const TodoItem = ({ data }) => {
  const dispatch = useAppDispatch();

  const completedStyle =
    "p-3 rounded-full bg-[#406ffa] border-[1px] border-black";
  const defaultStyle = "border-[1.7px] p-3 rounded-full border-black";
  const priorStyle = " bg-red-100 border-[0.1px]";

  let buttonStyle = data.completed ? completedStyle : defaultStyle;
  buttonStyle += data.priority && priorStyle;

  const onTodoClick = async () => {
    const res = await completeTodo(data.id);

    if (res.code !== 200) {
      window.alert(res.message);
      return;
    }

    dispatch(todosSliceActions.removeTodo({ todo: data }));
  };

  return (
    <div
      onClick={onTodoClick}
      className="flex items-center gap-x-4 mr-5
        hover:p-2 hover:px-4 hover:bg-[#ebeef9] hover:cursor-pointer
        rounded-lg transition-all duration-300"
    >
      <div className="flex">
        <span className={buttonStyle} />
      </div>
      <div>
        <p>{data.title}</p>
        <p className="text-gray-400 text-sm">
          {formatDate(data.created_at, "dddd, MMMM Do YYYY, h:mm")}
        </p>
      </div>
    </div>
  );
};

export default TodoItem;
