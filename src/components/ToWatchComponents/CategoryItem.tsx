import React, { MouseEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import towatchesSliceActions from "../../store/slices/towatchSlice";
import { getTowatchesByCategory } from "../../api/towatches/towatches";
import { selectAuthUser } from "../../store/slices/authSlice";
import { IToWatchCategory } from "../../types/towatch/towatch_category.type";
import { useNavigate } from "react-router-dom";
import { deleteTowatchCategory } from "../../api/categories/categories";
import RemoveSolid from "../Icons/RemoveSolid";

interface CategoryItemProps {
  data: IToWatchCategory;
}

const CategoryItem = ({ data }: CategoryItemProps) => {
  const user = useAppSelector(selectAuthUser);
  const [isHoverd, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();

  const deleteButtonStyle = isHoverd
    ? "opacity-100 w-[22px] -mb-[2px] transition-all duration-200"
    : "opacity-0 w-[22px] -mb-[2px]";

  const onCategoryClick = async () => {
    const res = await getTowatchesByCategory(data.id, user.id);

    if (res.code !== 200) {
      return;
    }

    const towatches = res.data;

    dispatch(
      towatchesSliceActions.selectCategory({
        category: data,
        towatches: towatches,
      })
    );
  };

  const onRemoveClick = async (e: MouseEvent) => {
    e.stopPropagation();

    const res = await deleteTowatchCategory(data.id);

    if (res.code !== 200) {
      return;
    }

    dispatch(
      towatchesSliceActions.removeFromInitialCategories({ category: data })
    );
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
