import React from "react";
import UserIcon from "./icons/UserIcon";

const Sidebar = () => {
  return (
    <div className="col-span-1 h-full w-full p-7 border-[0.1] border-r">
      <div className="w-full flex justify-center flex-col gap-y-7">
        <div className="flex items-center flex-col gap-y-4">
          <UserIcon />
          <div className="flex items-center flex-col gap-y-1">
            <p>Diar Begisbayev</p>
            <p className="text-gray-400">diar@gmail.com</p>
          </div>
        </div>

        <hr />

        <div className="flex flex-col gap-y-5">
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

        <hr />

        <div className="flex flex-col gap-y-5">
          <p className="font-bold text-center">Categories</p>
          <div className="flex flex-col justify-start gap-y-2">
            <div className="flex items-center gap-x-2 cursor-pointer">
              <span className="w-2 h-6 bg-[#EEAA88]" />
              <p>Work</p>
            </div>
            <div className="flex items-center gap-x-2 cursor-pointer">
              <span className="w-2 h-6 bg-[#468499]" />
              <p>House</p>
            </div>
            <div className="flex items-center gap-x-2 cursor-pointer">
              <span className="w-2 h-6 bg-[#FFC6C6]" />
              <p>Shop</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
