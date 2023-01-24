import React from "react";
import TodoItem from "./TodoItem";
import { useAppSelector } from "../../store/store";
import {
  selectCategory,
  selectTodos,
} from "../../store/slices/todosTasksSlice";
import Filter from "./Filter";

const TodoList = () => {
  const category = useAppSelector(selectCategory);
  const todos = useAppSelector(selectTodos);

  const categoryName = category?.name ?? "All";
  const categoryColor = category?.color ?? "#406ffa";

  const renderedItems = todos.map(item => (
    <TodoItem key={item.id} data={item} />
  ));

  return (
    <>
      <div className="flex items-center justify-between py-7">
        <div className="flex items-center gap-x-3">
          <span className={`w-2 h-8 bg-[${categoryColor}]`} />
          <p className="text-2xl">{categoryName}</p>
        </div>

        <Filter />
      </div>

      <div className="relative">
        <div className="max-h-[340px] flex flex-col gap-y-7 overflow-y-scroll">
          {renderedItems}
        </div>
      </div>
    </>
  );
};

export default TodoList;
