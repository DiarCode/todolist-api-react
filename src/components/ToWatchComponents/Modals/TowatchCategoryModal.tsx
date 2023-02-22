import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hooks";
import { colorsData } from "../../../constants/colors";
import { selectAuthUser } from "../../../store/slices/authSlice";
import towatchModalSliceActions, {
  selectIsCreateTowatchCategoryhModalOpen,
} from "../../../store/slices/towatchModalSlice";
import {
  creaeteTowatchCategory,
  getTowatchCategories,
} from "../../../api/categories/categories";
import towatchSlice from "../../../store/slices/towatchSlice";

const CreateTowatchCategoryModal = () => {
  const user = useAppSelector(selectAuthUser);
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsCreateTowatchCategoryhModalOpen);

  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const componentStyle = isOpen ? "flex" : "hidden";

  const onCloseClick = () => {
    dispatch(towatchModalSliceActions.closeCategoryModal());
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

    setIsLoading(true);
    const res = await creaeteTowatchCategory(dto);
    if (res.code !== 200) {
      setIsLoading(false);
      setError(res.message);
      return;
    }

    const categoriesRes = await getTowatchCategories(user.id);
    if (categoriesRes.code !== 200) {
      setError(categoriesRes.message);
      setIsLoading(false);
      return;
    }

    dispatch(
      towatchSlice.fillInitialCategories({ categories: categoriesRes.data })
    );
    dispatch(towatchModalSliceActions.closeCategoryModal());
    onResetAllParameters();
    setIsLoading(false);
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
            disabled={isLoading}
            onClick={onFormSubmit}
            className="px-10 py-2 rounded-lg bg-gradient-to-r from-[#406ffa] to-[#2948ff] text-gray-200"
            style={{ background: isLoading ? "#a6a6a6" : "" }}
          >
            New Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTowatchCategoryModal;
