import React, { useState } from "react";
import StarSolid from "../Icons/StarSolid";
import toWatchModalActions from "../../store/slices/towatchModalSlice";
import { useAppDispatch } from "../../store/store";
import { IToWatch } from "../../types/towatch/towatch.type";
import { formatDate } from "../../shared/dateFormatter";

interface ToWatchItemProps {
  data: IToWatch;
}

const ToWatchItem = ({ data }: ToWatchItemProps) => {
  const dispatch = useAppDispatch();

  const [isHovered, setIsHovered] = useState(false);

  const onItemClick = () => {
    dispatch(toWatchModalActions.showTowatchModal({ towatchItem: data }));
  };

  const hoveredDetailsContent = isHovered && (
    <div
      className=" hidden sm:block rounded-xl absolute top-0 right-0 bottom-0 left-0 p-4 cursor-pointer bg-opacity-70 bg-black "
      onClick={e => e.preventDefault()}
    >
      <div className="rounded-xl flex flex-col justify-between h-full">
        <div className="mt-auto flex flex-col">
          <div className="flex items-center gap-1">
            <p className="text-white text-lg sm:text-2xl font-bold">
              {data.rating}
            </p>
            <StarSolid fill={"#406ffa"} className="w-6 h-6" />
          </div>
          <p className="text-white text-xs sm:text-sm font-normal truncate text-ellipsis overflow-x-hidden">
            {formatDate(data.start_date, "MMM YYYY")} -
            {formatDate(data.start_date, "MMM YYYY")}
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
      onClick={onItemClick}
      className="w-[120px] sm:w-[177px] sm:pl-2 pt-2 flex"
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-[120px] sm:w-[177px]">
        <div className="relative cursor-pointer h-[183px] sm:h-[240px] bg-black rounded-xl sm:hover:scale-105 duration-500">
          {hoveredDetailsContent}
          <picture>
            <img
              loading="lazy"
              src={data.image}
              className="rounded-xl duration-200 bg-gray-500 object-cover h-full w-[120px] sm:w-[177px]"
              alt={data.title}
            />
          </picture>
        </div>

        <div className="py-3 pl-2">
          <p
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="cursor-pointer truncate text-ellipsis overflow-x-hidden text-sm sm:text-base text-black font-medium"
          >
            {data.title}
          </p>
          <p className="truncate text-ellipsis overflow-x-hidden text-xs sm:text-sm  text-[#406ffa]">
            {data.studio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToWatchItem;
