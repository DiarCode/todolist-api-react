import React from "react";
import { ITodoCategory } from "../../types/todos/category.type";
import { useAppDispatch } from "../../store/store";
import categoriesTaskslActions from "../../store/slices/todosTasksSlice";
import { todosData } from "../../mock/todos";

interface CategoryItemProps {
  data: ITodoCategory;
}

const CategoryItem = ({ data }: CategoryItemProps) => {
  const dispatch = useAppDispatch();

  const onCategoryClick = () => {
    dispatch(
      categoriesTaskslActions.selectCategory({
        category: data,
        todos: todosData,
      })
    );
  };
  return (
    <div
      onClick={onCategoryClick}
      className="flex items-center gap-x-2 cursor-pointer"
    >
      <span className={`w-2 h-6 bg-[${data.color}]`} />
      <p>{data.name}</p>
    </div>
  );
};

export default CategoryItem;
