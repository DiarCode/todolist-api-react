import React from "react";
import UserIcon from "../Icons/UserIcon";
import { categoriesData } from "../../mock/categories";
import categoriesTasksActions from "../../store/slices/todosTasksSlice";
import { useAppDispatch } from "../../store/store";
import { todosData } from "../../mock/todos";
import CategoryItem from "../TodosComponents/CategoryItem";
import SidebarUserInfo from "../SidebarUserInfo/SidebarUserInfo";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  const renderedCategories = categoriesData.map(category => (
    <CategoryItem key={category.id} data={category} />
  ));

  return (
    <div className="col-span-1 h-full w-full p-7 border-[0.1] border-r">
      <div className="w-full h-full flex justify-center flex-col">
        <div className="mb-7">
          <SidebarUserInfo />
        </div>

        <hr className="mb-7" />

        <div className="h-full flex flex-col gap-y-7 ">
          <div className="h-1/2">
            <div className="flex flex-col gap-y-5">
              <p className="font-bold text-center">Anime filters</p>
              <div className="h-[12rem] flex flex-col justify-start gap-y-2 overflow-auto">
                {renderedCategories}
              </div>
            </div>
          </div>

          <hr />

          <div className="h-1/2">
            <div className="flex flex-col gap-y-5">
              <p className="font-bold text-center">Categories</p>
              <div className="h-[12rem] flex flex-col justify-start gap-y-2 overflow-y-auto">
                {renderedCategories}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
