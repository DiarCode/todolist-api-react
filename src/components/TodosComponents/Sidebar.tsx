import React from "react";
import CategoryItem from "./CategoryItem";
import SidebarUserInfo from "../SidebarUserInfo/SidebarUserInfo";
import { useAppDispatch, useAppSelector } from "../../store/store";
import createTaskModalActions from "../../store/slices/createTaskSlice";
import { useQuery } from "react-query";
import { getTodoCategories } from "../../api/categories/categories";
import { selectAuthUser } from "../../store/slices/authSlice";

const Sidebar = () => {
  const user = useAppSelector(selectAuthUser);
  const { data: categories } = useQuery(
    "todo-category",
    () => getTodoCategories(user.id),
    {
      enabled: user !== null,
    }
  );
  const dispatch = useAppDispatch();

  const renderedCategories = categories?.data.map(category => (
    <CategoryItem key={category.id} data={category} />
  ));

  const onAddButtonClick = () => {
    dispatch(createTaskModalActions.showCategoryModal());
  };

  return (
    <div className="col-span-1 h-full w-full p-7 border-[0.1] border-r">
      <div className="w-full h-full flex justify-center flex-col">
        <div className="mb-7">
          <SidebarUserInfo />
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
