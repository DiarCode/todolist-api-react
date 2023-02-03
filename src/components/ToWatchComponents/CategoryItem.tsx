import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import towatchesSliceActions from "../../store/slices/towatchSlice";
import { getTowatchesByCategory } from "../../api/towatches/towatches";
import { selectAuthUser } from "../../store/slices/authSlice";
import { IToWatchCategory } from "../../types/towatch/towatch_category.type";

interface CategoryItemProps {
  data: IToWatchCategory;
}

const CategoryItem = ({ data }: CategoryItemProps) => {
  const user = useAppSelector(selectAuthUser);
  const dispatch = useAppDispatch();

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
  return (
    <div
      onClick={onCategoryClick}
      className="hover:bg-[#ebeef9] flex items-center justify-between cursor-pointer p-2 rounded-lg"
    >
      <div className="flex items-center gap-x-2">
        <span className="w-2 h-6" style={{ backgroundColor: data.color }} />
        <p>{data.value}</p>
      </div>
    </div>
  );
};

export default CategoryItem;
