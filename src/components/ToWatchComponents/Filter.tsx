import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { selectFilterState } from "../../store/slices/todosTasksSlice";
import todosActions from "../../store/slices/todosTasksSlice";
import { ITodo } from "../../types/todos/todo.type";

interface TowatchFilterProps {
  todos: ITodo[];
}

const filters = [
  { value: "Popular" },
  { value: "Finished" },
  { value: "Episodes" },
];

const Filter = ({ todos }: TowatchFilterProps) => {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector(selectFilterState);

  const onFilterChange = (value: string) => {
    dispatch(
      todosActions.onFilterChange({
        initialTodos: todos,
        filter: value,
      })
    );
  };

  const renderedFilters = filters.map((filter, index) => {
    let filterItemStyle = "text-gray-400 cursor-pointer";
    if (filter.value.toUpperCase() === currentFilter) {
      filterItemStyle =
        "text-gray-100 bg-[#406ffa] rounded-md px-3 py-[2px] cursor-pointer";
    }
    return (
      <p
        key={index}
        onClick={() => onFilterChange(filter.value)}
        className={filterItemStyle}
      >
        {filter.value}
      </p>
    );
  });

  return (
    <div className="flex items-center gap-x-5 uppercase">{renderedFilters}</div>
  );
};

export default Filter;
