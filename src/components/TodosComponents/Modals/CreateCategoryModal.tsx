import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import createTaskModalActions, {
  selectIsCategoryOpen,
} from "../../../store/slices/createTaskSlice";
import { colorsData } from "../../../mock/colors";

const CreateCategoryModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsCategoryOpen);

  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
  const [categoryTitle, setCategoryTitle] = useState<string>("");

  const componentStyle = isOpen ? "flex" : "hidden";

  const onCloseClick = () => {
    dispatch(createTaskModalActions.closeCategoryModal());
  };

  const onSelectColor = (id: number) => {
    setSelectedColorId(id);
  };

  const onTitleChange = (title: string) => {
    setCategoryTitle(title);
  };

  const onResetAllParameters = () => {
    setSelectedColorId(null);
    setCategoryTitle("");
  };

  const onFormSubmit = () => {
    const checkValues = [categoryTitle, selectedColorId];

    if (!checkValues.every(value => value != null && value !== "")) {
      console.log("error");
      return;
    }

    const color = colorsData.find(value => value.id === selectedColorId);

    const obj = {
      title: categoryTitle,
      color: color!.value,
    };

    console.log(obj);
    dispatch(createTaskModalActions.closeCategoryModal());
    onResetAllParameters();
  };

  const renderedColors = colorsData.map((color, index) => {
    const isColorSelected = selectedColorId === color.id;
    const bdColor = color.value;

    let itemStyle = `w-10 h-10 rounded-full cursor-pointer`;

    if (isColorSelected) {
      itemStyle += " border-[3px] border-black";
    }

    return (
      <div
        key={color.id}
        style={{ backgroundColor: bdColor }}
        onClick={() => onSelectColor(color.id)}
        className={itemStyle}
      />
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
          <textarea
            value={categoryTitle}
            onChange={e => onTitleChange(e.target.value)}
            className="w-full h-[100px] resize-none text-4xl"
            placeholder="Enter a category title..."
          />
          <hr />
        </div>

        <div className="flex flex-col mb-14">
          <p className="font-bold">Choose color</p>
          <div className="flex items-center gap-x-3 overflow-x-auto py-4">
            {renderedColors}
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

export default CreateCategoryModal;
