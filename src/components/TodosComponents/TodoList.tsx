import React from "react";
import TodoItem from "./TodoItem";
import { useAppSelector } from "../../hooks/redux.hooks";
import {
  selectCategory,
  selectTodos,
} from "../../store/slices/todosTasksSlice";
import Filter from "./Filter";

const TodoList = () => {
  const category = useAppSelector(selectCategory);

  const todos = useAppSelector(selectTodos);

  const onMountRendered = (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="font-bold text-2xl text-gray-300 text-center mb-2">TODOS</p>
      <p className="text-xl text-gray-300 text-center">
        Create categories and <br /> attach tasks to them
      </p>
    </div>
  );

  const renderedItems = todos?.map(item => (
    <TodoItem key={item.id} data={item} />
  ));

  return (
    <>
      {category?.id == null ? (
        onMountRendered
      ) : (
        <>
          <div className="flex items-center justify-between py-7">
            <div className="flex items-center gap-x-3">
              <span
                className="w-2 h-8"
                style={{ backgroundColor: category?.color }}
              />
              <p className="text-2xl">{category?.value}</p>
            </div>

            <Filter />
          </div>

          <div className="relative">
            <div className="max-h-[340px] flex flex-col gap-y-7 overflow-y-auto">
              {renderedItems}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TodoList;
