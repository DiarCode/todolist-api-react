import React from "react";
import { useAppSelector } from "../../store/store";
import Filter from "./Filter";
import {
  selectTowatchCategory,
  selectTowatches,
} from "../../store/slices/towatchSlice";
import TowatchItem from "./ToWatchItem";

const TowatchList = () => {
  const category = useAppSelector(selectTowatchCategory);
  const towatches = useAppSelector(selectTowatches);

  const renderedItems = towatches?.map(item => (
    <TowatchItem key={item.id} data={item} />
  ));

  return (
    <>
      <div className="flex items-center justify-between py-7">
        <div className="flex items-center gap-x-3">
          <span
            className="w-2 h-8"
            style={{ backgroundColor: category?.color }}
          />
          <p className="text-2xl">{category?.value}</p>
        </div>

        <Filter />
      </div>

      <div className="relative">
        <div className="max-h-[340px] flex flex-col gap-y-7 overflow-y-auto">
          {renderedItems}
        </div>
      </div>
    </>
  );
};

export default TowatchList;
