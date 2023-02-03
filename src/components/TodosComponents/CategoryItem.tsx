import React, { MouseEvent, useState } from "react";
import { ITodoCategory } from "../../types/todos/category.type";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import categoriesTaskslActions from "../../store/slices/todosTasksSlice";
import RemoveSolid from "../Icons/RemoveSolid";
import { getTodosByCategory } from "../../api/todos/todos";
import { selectAuthUser } from "../../store/slices/authSlice";
import { deleteTodoCategory } from "../../api/categories/categories";
import { useNavigate } from "react-router-dom";

interface CategoryItemProps {
  data: ITodoCategory;
}

const CategoryItem = ({ data }: CategoryItemProps) => {
  const user = useAppSelector(selectAuthUser);
  const [isHoverd, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const deleteButtonStyle = isHoverd
    ? "opacity-100 w-[22px] -mb-[2px] transition-all duration-200"
    : "opacity-0 w-[22px] -mb-[2px]";

  const onCategoryClick = async () => {
    const res = await getTodosByCategory(data.id, user.id);

    if (res.code !== 200) {
      return;
    }

    const todos = res.data;

    dispatch(
      categoriesTaskslActions.selectCategory({
        category: data,
        todos: todos,
      })
    );
  };

  const onRemoveClick = async (e: MouseEvent) => {
    e.stopPropagation();

    const res = await deleteTodoCategory(data.id);

    if (res.code !== 200) {
      return;
    }

    navigate(0);
  };

  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onCategoryClick}
      className="hover:bg-[#ebeef9] flex items-center justify-between cursor-pointer p-2 rounded-lg"
    >
      <div className="flex items-center gap-x-2">
        <span className="w-2 h-6" style={{ backgroundColor: data.color }} />
        <p>{data.value}</p>
      </div>

      <div>
        <button onClick={e => onRemoveClick(e)}>
          <RemoveSolid className={deleteButtonStyle} fill={"#406ffa"} />
        </button>
      </div>
    </div>
  );
};

export default CategoryItem;
