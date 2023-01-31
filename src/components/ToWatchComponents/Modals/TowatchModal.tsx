import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import towatchModalActions, {
  selectIsTowatchModalOpen,
} from "../../../store/slices/towatchSlice";
import { categoriesData } from "../../../mock/categories";

const ToWatchModal = () => {
  const dispatch = useAppDispatch();
  const { isTowatchModalOpen: isOpen, towatchItem: data } = useAppSelector(
    selectIsTowatchModalOpen
  );

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const componentStyle = isOpen ? "flex" : "hidden";

  const onCloseClick = () => {
    dispatch(towatchModalActions.closeTowatchModal());
  };

  const onSelectCategory = (id: number) => {
    setSelectedCategoryId(id);
  };

  const onResetAllParameters = () => {
    setSelectedCategoryId(null);
  };

  const onFormSubmit = () => {
    const checkValues = [selectedCategoryId];

    if (!checkValues.every(value => value != null)) {
      console.log("error");
      return;
    }

    const obj = {
      towatch: data,
      category_id: selectedCategoryId,
    };

    console.log(obj);
    dispatch(towatchModalActions.closeTowatchModal());
    onResetAllParameters();
  };

  const renderedCategories = categoriesData.map((category, index) => {
    const isCategorySelected = selectedCategoryId === category.id;

    let componentStyle = "flex items-center gap-x-2 cursor-pointer";
    if (isCategorySelected) {
      componentStyle += " text-gray-100 bg-[#406ffa] rounded-md px-3 py-[2px]";
    }
    return (
      <div
        key={category.id}
        onClick={() => onSelectCategory(category.id)}
        className={componentStyle}
      >
        <span
          style={{ backgroundColor: category.color }}
          className={`w-2 h-6`}
        />
        <p>{category.name}</p>
      </div>
    );
  });

  return (
    <div
      onClick={onCloseClick}
      className={
        "z-40 absolute w-screen h-screen overflow-hidden items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm " +
        componentStyle
      }
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-2/4 bg-white rounded-xl p-9"
      >
        <div className="mb-7">
          <p className="text-4xl">{data?.title}</p>
          <hr />
        </div>

        <div className="flex flex-col mb-14">
          <p className="font-bold">Choose category</p>
          <div className="flex items-center gap-x-3 overflow-x-auto py-4">
            {renderedCategories}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={onFormSubmit}
            className="px-10 py-2 rounded-lg bg-gradient-to-r from-[#406ffa] to-[#2948ff] text-gray-200"
          >
            Add category
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToWatchModal;
