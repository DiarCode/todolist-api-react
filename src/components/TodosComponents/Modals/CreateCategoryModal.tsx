import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hooks";
import createTaskModalActions, {
  selectIsCategoryOpen,
} from "../../../store/slices/createTaskSlice";
import { colorsData } from "../../../constants/colors";
import {
  creaeteTodoCategory,
  getTodoCategories,
} from "../../../api/categories/categories";
import { selectAuthUser } from "../../../store/slices/authSlice";
import todosSliceActions from "../../../store/slices/todosTasksSlice";

const CreateCategoryModal = () => {
  const user = useAppSelector(selectAuthUser);
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsCategoryOpen);

  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [error, setError] = useState("");

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

  const onFormSubmit = async () => {
    const checkValues = [categoryTitle, selectedColorId, user];

    if (!checkValues.every(value => value != null && value !== "")) {
      return;
    }

    const color = colorsData.find(value => value.id === selectedColorId);

    const dto = {
      value: categoryTitle,
      color: color!.value,
      user_id: user.id,
    };

    const res = await creaeteTodoCategory(dto);
    if (res.code !== 200) {
      setError(res.message);
      return;
    }

    const categoriesRes = await getTodoCategories(user.id);
    if (categoriesRes.code !== 200) {
      setError(categoriesRes.message);
      return;
    }

    dispatch(
      todosSliceActions.fillInitialCategories({
        categories: categoriesRes.data,
      })
    );
    dispatch(createTaskModalActions.closeCategoryModal());
    onResetAllParameters();
  };

  const renderedColors = colorsData.map(color => {
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

        <div className="flex flex-col mb-7">
          <p className="font-bold">Choose color</p>
          <div className="flex items-center gap-x-3 overflow-x-auto py-4">
            {renderedColors}
          </div>
        </div>

        <div className="mb-14">
          <p className="text-red-400">{error}</p>
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
