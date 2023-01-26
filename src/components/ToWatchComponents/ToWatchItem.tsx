import React, { useState } from "react";
import StarSolid from "../Icons/StarSolid";

const ToWatchItem = () => {
  const [isHovered, setIsHovered] = useState(false);

  const hoveredDetailsContent = isHovered && (
    <div
      className=" hidden sm:block rounded-xl absolute top-0 right-0 bottom-0 left-0 p-4 cursor-pointer bg-opacity-70 bg-black "
      onClick={e => e.preventDefault()}
    >
      <div className="rounded-xl flex flex-col justify-between h-full">
        <div className="mt-auto flex flex-col">
          <div className="flex items-center gap-1">
            <p className="text-white text-lg sm:text-2xl font-bold">9.1</p>
            <StarSolid fill={"#406ffa"} className="w-6 h-6" />
          </div>
          <p className="text-white text-xs sm:text-sm font-normal truncate text-ellipsis overflow-x-hidden">
            Oct 2022 - Dec 2022
          </p>
          <p className="text-white text-xs sm:text-sm font-normal truncate text-ellipsis overflow-x-hidden">
            13 episodes
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="w-[120px] sm:w-[177px] sm:pl-2 pt-2 flex"
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-[120px] sm:w-[177px]">
        <div className="relative cursor-pointer h-[183px] sm:h-[240px] bg-black rounded-xl sm:hover:scale-105 duration-500">
          {hoveredDetailsContent}
          <picture>
            <img
              src="https://cdn.myanimelist.net/images/anime/1764/126627.jpg"
              className="rounded-xl duration-200 bg-gray-500 object-cover h-full w-[120px] sm:w-[177px]"
              alt=""
            />
          </picture>
        </div>

        <div className="py-3 pl-2">
          <p
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="cursor-pointer truncate text-ellipsis overflow-x-hidden text-sm sm:text-base text-black font-medium"
          >
            Bleach: Sennen Kessen-hen
          </p>
          <p className="truncate text-ellipsis overflow-x-hidden text-xs sm:text-sm  text-[#406ffa]">
            TV Tokyo
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToWatchItem;