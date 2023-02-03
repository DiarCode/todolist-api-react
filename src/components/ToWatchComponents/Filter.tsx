import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import towatchesSliceActions, {
  selectTowatchFilterState,
} from "../../store/slices/towatchSlice";
import { TOWATCHES_FILTERS } from "../../constants/filters";

const Filter = () => {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector(selectTowatchFilterState);

  const onFilterChange = (value: string) => {
    dispatch(
      towatchesSliceActions.onFilterChange({
        filter: value,
      })
    );
  };

  const renderedFilters = Object.values(TOWATCHES_FILTERS).map(
    (filter, index) => {
      let filterItemStyle = "text-gray-400 cursor-pointer";
      if (filter.toUpperCase() === currentFilter) {
        filterItemStyle =
          "text-gray-100 bg-[#406ffa] rounded-md px-3 py-[2px] cursor-pointer";
      }
      return (
        <p
          key={index}
          onClick={() => onFilterChange(filter)}
          className={filterItemStyle}
        >
          {filter}
        </p>
      );
    }
  );

  return (
    <div className="flex items-center gap-x-5 uppercase">{renderedFilters}</div>
  );
};

export default Filter;
