import React from "react";
import SidebarUserInfo from "../SidebarUserInfo/SidebarUserInfo";
import CategoryItem from "./CategoryItem";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import { getTowatchCategories } from "../../api/categories/categories";
import { selectAuthUser } from "../../store/slices/authSlice";
import { getAllTowatches } from "../../api/towatches/towatches";
import towatchesSliceActions, {
  selectInitialTowatchCategories,
} from "../../store/slices/towatchSlice";
import towatchModalSliceActions from "../../store/slices/towatchModalSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const categories = useAppSelector(selectInitialTowatchCategories);

  React.useEffect(() => {
    (async function () {
      if (user) {
        const res = await getTowatchCategories(user.id);
        if (res.code === 200) {
          dispatch(
            towatchesSliceActions.fillInitialCategories({
              categories: res.data,
            })
          );
        }
      }
    })();
  }, [dispatch, user]);

  const renderedCategories = categories.map(category => (
    <CategoryItem key={category.id} data={category} />
  ));

  const onTowatchesClick = async () => {
    const res = await getAllTowatches();

    if (res.code !== 200) {
      return;
    }

    dispatch(
      towatchesSliceActions.selectCategory({
        category: { value: "Animes", color: "blue" },
        towatches: res.data,
      })
    );
  };

  const onAddButtonClick = () => {
    dispatch(towatchModalSliceActions.showCategoryModal());
  };

  return (
    <div className="col-span-1 h-full w-full p-7 border-[0.1] border-r">
      <div className="w-full h-full flex flex-col">
        <div className="mb-7">
          <SidebarUserInfo />
        </div>

        <hr className="mb-7" />

        <div className="flex flex-col gap-y-5 mb-4">
          <p className="font-bold text-center">Towatches</p>
          <div className="max-h-[15rem] flex flex-col justify-start overflow-y-auto">
            <div
              onClick={onTowatchesClick}
              className="w-full hover:bg-[#ebeef9] flex items-center justify-between cursor-pointer p-2 rounded-lg"
            >
              <div className="flex items-center gap-x-2">
                <p>Animes</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="mb-7" />

        <div className="flex flex-col gap-y-5">
          <p className="font-bold text-center">Categories</p>
          <div className="max-h-[15rem] flex flex-col justify-start overflow-y-auto">
            {renderedCategories}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-center">
          <button
            onClick={onAddButtonClick}
            className="px-6 py-2 rounded-lg bg-gradient-to-r text-gray-200"
          >
            + Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
