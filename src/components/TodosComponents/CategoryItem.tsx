import React, { MouseEvent, useState } from "react";
import { ITodoCategory } from "../../types/todos/category.type";
import { useAppDispatch } from "../../store/store";
import categoriesTaskslActions from "../../store/slices/todosTasksSlice";
import { todosData } from "../../mock/todos";
import RemoveSolid from "../Icons/RemoveSolid";

interface CategoryItemProps {
  data: ITodoCategory;
}

const CategoryItem = ({ data }: CategoryItemProps) => {
  const [isHoverd, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();

  const deleteButtonStyle = isHoverd
    ? "opacity-100 w-6 h-6 transition-all duration-200"
    : "opacity-0";

  const onCategoryClick = () => {
    dispatch(
      categoriesTaskslActions.selectCategory({
        category: data,
        todos: todosData,
      })
    );
  };

  const onRemoveClick = (e: MouseEvent) => {
    e.stopPropagation();
    return null;
  };

  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onCategoryClick}
      className="flex items-center justify-between cursor-pointer"
    >
      <div className="flex items-center gap-x-2">
        <span className="w-2 h-6" style={{ backgroundColor: data.color }} />
        <p>{data.name}</p>
      </div>

      <div>
        <button onClick={e => onRemoveClick(e)}>
          <RemoveSolid className={deleteButtonStyle} fill={"#8d8d8d"} />
        </button>
      </div>
    </div>
  );
};

export default CategoryItem;
