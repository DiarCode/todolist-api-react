import React from "react";
import Navbar from "../Navbar/Navbar";
import { useAppDispatch } from "../../store/store";
import createTaskModalActions from "../../store/slices/createTaskSlice";

import TodoList from "./TodoList";

const Content = () => {
  const dispatch = useAppDispatch();

  const onAddButtonClick = () => {
    dispatch(createTaskModalActions.showModal());
  };

  return (
    <div className="col-span-3 h-full w-full p-7 flex flex-col">
      <div className="flex justify-end pb-7">
        <Navbar />
      </div>

      <hr />

      <TodoList />

      <div className="mt-auto flex items-center justify-center">
        <button
          onClick={onAddButtonClick}
          className="px-10 py-2 rounded-lg bg-gradient-to-r text-gray-200"
        >
          New Task
        </button>
      </div>
    </div>
  );
};

export default Content;
