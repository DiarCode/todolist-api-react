import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import Filter from "./Filter";
import towatchesActions, {
  selectTowatchCategory,
  selectTowatches,
} from "../../store/slices/towatchSlice";
import TowatchItem from "./ToWatchItem";
import { useQuery } from "react-query";
import { getAllTowatches } from "../../api/towatches/towatches";

const TowatchList = () => {
  const dispatch = useAppDispatch();
  const { data: initialTodos } = useQuery("initial-towatches", getAllTowatches);
  const category = useAppSelector(selectTowatchCategory);
  const towatches = useAppSelector(selectTowatches);

  React.useEffect(() => {
    if (initialTodos !== undefined && initialTodos.code === 200) {
      dispatch(
        towatchesActions.selectCategory({
          towatches: initialTodos.data,
          category: { value: "Animes", color: "blue" },
        })
      );
    }
  }, [dispatch, initialTodos]);

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
        <div className="w-full max-h-[570px] flex flex-wrap gap-x-5 gap-y-3 overflow-y-auto">
          {renderedItems}
        </div>
      </div>
    </>
  );
};

export default TowatchList;
