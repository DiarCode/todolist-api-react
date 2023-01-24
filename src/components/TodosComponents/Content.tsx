import React from "react";
import Navbar from "../Navbar/Navbar";
import TodoItem from "./TodoItem";
import { useAppDispatch } from "../../store/store";
import createTaskModalActions from "../../store/slices/createTaskSlice";

const data = [
  {
    id: 1,
    title: "Implement task sorting",
    description: "Create several files",
    created_at: Date.now(),
    completed: false,
  },
  {
    id: 2,
    title: "Finish design for new webiste",
    description: "",
    created_at: Date.now(),
    completed: false,
  },
  {
    id: 3,
    title: "Correct mail sending form",
    description: "Use Tailwind",
    created_at: Date.now(),
    completed: true,
  },
  {
    id: 4,
    title: "Implement task sorting",
    description: "Create several files",
    created_at: Date.now(),
    completed: false,
  },
  {
    id: 5,
    title: "Finish design for new webiste",
    description: "",
    created_at: Date.now(),
    completed: false,
  },
  {
    id: 6,
    title: "Correct mail sending form",
    description: "Use Tailwind",
    created_at: Date.now(),
    completed: true,
  },
];

const Content = () => {
  const dispatch = useAppDispatch();

  const renderedItems = data.map(item => (
    <TodoItem key={item.id} data={item} />
  ));

  const onAddButtonClick = () => {
    dispatch(createTaskModalActions.showModal());
  };

  return (
    <div className="col-span-3 h-full w-full p-7 flex flex-col">
      <div className="flex justify-end pb-7">
        <Navbar />
      </div>

      <hr />

      <div className="flex items-center justify-between py-7">
        <div className="flex items-center gap-x-3">
          <span className="w-2 h-8 bg-[#EEAA88]" />
          <p className="text-2xl">Work</p>
        </div>

        <div className="flex items-center gap-x-3 uppercase">
          <p className="text-gray-100 bg-[#406ffa] rounded-md px-3 py-[2px]">
            All
          </p>
          <p className="text-gray-400 ">Active</p>
          <p className="text-gray-400">Primary</p>
        </div>
      </div>

      <div className="relative">
        <div className="max-h-[340px] flex flex-col gap-y-7 overflow-y-scroll">
          {renderedItems}
        </div>

        {/* <span className="absolute -bottom-4 right-0 left-0 w-full h-[60px] bg-gradient-to-t from-gray-100" /> */}
      </div>

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
