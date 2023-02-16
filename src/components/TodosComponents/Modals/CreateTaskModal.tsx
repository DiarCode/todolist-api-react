import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux.hooks";
import createTaskModalActions, {
  selectIsTodosOpen,
} from "../../../store/slices/createTaskSlice";
import { selectAuthUser } from "../../../store/slices/authSlice";
import { createTodo } from "../../../api/todos/todos";
import { CreateTodoDto } from "../../../types/todos/todo.type";
import todosSliceActions, {
  selectInitialCategories,
} from "../../../store/slices/todosTasksSlice";

const CreateTaskModal = () => {
  const user = useAppSelector(selectAuthUser);
  const categories = useAppSelector(selectInitialCategories);

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsTodosOpen);
  const [error, setError] = useState("");

  const [selectedCategoryId, setSelectedCategoryId] = useState<number>(-1);
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [priority, setPriority] = useState(false);

  const componentStyle = isOpen ? "flex" : "hidden";

  const onCloseClick = () => {
    dispatch(createTaskModalActions.closeTodosModal());
  };

  const onSelectCategory = (id: number) => {
    setSelectedCategoryId(id);
  };

  const onPriorityChange = () => {
    setPriority(prev => !prev);
  };

  const onTitleChange = (title: string) => {
    setTodoTitle(title);
  };

  const onResetAllParameters = () => {
    setSelectedCategoryId(-1);
    setTodoTitle("");
  };

  const onFormSubmit = async () => {
    const checkValues = [todoTitle, selectedCategoryId];

    if (!checkValues.every(value => value != null && value !== -1)) {
      return;
    }

    const dto: CreateTodoDto = {
      title: todoTitle,
      priority: priority,
      user_id: user.id,
      category_id: selectedCategoryId,
    };

    const res = await createTodo(dto);
    if (res.code !== 200) {
      setError(res.message);
      return;
    }

    dispatch(todosSliceActions.addTodo({ todo: res.data }));
    dispatch(createTaskModalActions.closeTodosModal());
    onResetAllParameters();
  };

  const renderedCategories = categories?.map(category => {
    const isCategorySelected = selectedCategoryId === category.id;

    let componentStyle = "flex items-center gap-x-2 cursor-pointer";
    if (isCategorySelected) {
      componentStyle +=
        " text-gray-100 bg-[#ebeef9] text-black rounded-md px-3 py-[2px]";
    }
    return (
      <div
        key={category.id}
        onClick={() => onSelectCategory(category.id)}
        className={componentStyle}
      >
        <span
          style={{ backgroundColor: category.color }}
          className={`w-2 h-6`}
        />
        <p>{category.value}</p>
      </div>
    );
  });

  return (
    <div
      onClick={onCloseClick}
      className={
        "z-40 absolute w-screen h-screen overflow-hidden items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm " +
        componentStyle
      }
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-2/4 bg-white rounded-xl p-9"
      >
        <div className="mb-7">
          <textarea
            value={todoTitle}
            onChange={e => onTitleChange(e.target.value)}
            className="w-full h-[100px] resize-none text-4xl"
            placeholder="Enter a task..."
          />
          <hr />
        </div>

        <div className="flex flex-col mb-5">
          <p className="font-bold">Choose category</p>
          <div className="flex items-center gap-x-8 overflow-x-auto py-4">
            {renderedCategories.length === 0 ? (
              <p className="text-gray-300">Add new category to create todo</p>
            ) : (
              renderedCategories
            )}
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <p className="font-bold">Priority</p>

          <div className="flex items-center gap-x-2 py-4">
            <input
              type="radio"
              className="w-5 h-5"
              id="prior_input"
              checked={priority}
              onChange={() => {}}
              onClick={onPriorityChange}
            />

            <label htmlFor="prior_input">Make task prior</label>
          </div>
        </div>

        <div className="mb-14">
          <p className="text-red-400">{error}</p>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={onFormSubmit}
            className="px-10 py-2 rounded-lg bg-gradient-to-r from-[#406ffa] to-[#2948ff] text-gray-200"
          >
            New Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
