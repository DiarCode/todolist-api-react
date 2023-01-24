import React from "react";
import UserIcon from "../Icons/UserIcon";
import { categoriesData } from "../../mock/categories";
import CategoryItem from "./CategoryItem";
import categoriesTasksActions from "../../store/slices/todosTasksSlice";
import { useAppDispatch } from "../../store/store";
import { todosData } from "../../mock/todos";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const renderedCategories = categoriesData.map(category => (
    <CategoryItem key={category.id} data={category} />
  ));

  const onResetCategoriesClick = () => {
    dispatch(categoriesTasksActions.resetCategories({ todos: todosData }));
  };

  return (
    <div className="col-span-1 h-full w-full p-7 border-[0.1] border-r">
      <div className="w-full h-full flex justify-center flex-col">
        <div className="flex items-center flex-col gap-y-4 mb-7">
          <UserIcon />
          <div className="flex items-center flex-col gap-y-1">
            <p>Diar Begisbayev</p>
            <p className="text-gray-400">diar@gmail.com</p>
          </div>
        </div>

        <hr className="mb-7" />

        <div className="flex flex-col gap-y-5 mb-7">
          <p className="font-bold text-center">Today</p>
          <div className="flex justify-between text-sm">
            <div className="flex flex-col gap-y-2 items-center">
              <p className="font-bold text-xl">4</p>
              <p className="text-gray-400 text-center">
                To do <br /> tasks
              </p>
            </div>
            <div className="flex flex-col gap-y-2 items-center">
              <p className="font-bold text-xl">1</p>
              <p className="text-gray-400 text-center">
                Completed <br /> tasks
              </p>
            </div>
            <div className="flex flex-col gap-y-2 items-center">
              <p className="font-bold text-xl">0</p>
              <p className="text-gray-400 text-center">
                Primary <br /> tasks
              </p>
            </div>
          </div>
        </div>

        <hr className="mb-7" />

        <div className="flex flex-col gap-y-5">
          <p className="font-bold text-center">Categories</p>
          <div className="max-h-[90px] flex flex-col justify-start gap-y-2 overflow-y-scroll">
            <div
              onClick={onResetCategoriesClick}
              className="flex items-center gap-x-2 cursor-pointer"
            >
              <span className={`w-2 h-6 bg-[#406ffa]`} />
              <p>All</p>
            </div>
            {renderedCategories}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-center">
          <button className="px-6 py-2 rounded-lg bg-gradient-to-r text-gray-200">
            + Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
