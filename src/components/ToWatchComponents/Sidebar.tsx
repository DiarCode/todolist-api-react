import React from "react";
import UserIcon from "../Icons/UserIcon";
import { categoriesData } from "../../mock/categories";
import categoriesTasksActions from "../../store/slices/todosTasksSlice";
import { useAppDispatch } from "../../store/store";
import { todosData } from "../../mock/todos";
import SidebarUserInfo from "../SidebarUserInfo/SidebarUserInfo";
import CategoryItem from "./CategoryItem";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const renderedCategories = categoriesData.map(category => (
    <CategoryItem key={category.id} data={category} />
  ));

  return (
    <div className="col-span-1 h-full w-full p-7 border-[0.1] border-r">
      <div className="w-full h-full flex flex-col">
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
      </div>
    </div>
  );
};

export default Sidebar;
