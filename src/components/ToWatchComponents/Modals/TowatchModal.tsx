import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux.hooks";
import towatchModalActions, {
  selectIsTowatchModalOpen,
} from "../../../store/slices/towatchModalSlice";
import { useQuery } from "react-query";
import { addTowatchToCategory, getTowatchCategories } from "../../../api/categories/categories";
import { selectAuthUser } from "../../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const ToWatchModal = () => {
  const user = useAppSelector(selectAuthUser);
  const dispatch = useAppDispatch();
  const { isOpen, data } = useAppSelector(selectIsTowatchModalOpen);
  const { data: categories } = useQuery(
    "towatch-category",
    () => getTowatchCategories(user.id),
    {
      enabled: user !== null,
    }
  );
  
  const navigate = useNavigate()

  const [error, setError] = useState("");
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

  const onFormSubmit = async () => {
    const checkValues = [selectedCategoryId];

    if (!checkValues.every(value => value != null)) {
      return;
    }

    const dto = {
      towatch_id: data.id,
      towatch_category_id: selectedCategoryId!,
      user_id: user.id,
    };
  
    const res = await addTowatchToCategory(dto)

    if (res.code !== 200){
      setError(res.message)
      return
    } 

    dispatch(towatchModalActions.closeTowatchModal());
    onResetAllParameters();
    navigate(0);
  };

  const renderedCategories = categories?.data.map(category => {
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
        <p className="text-black">{category.value}</p>
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
          <p className="text-4xl mb-5">{data?.title}</p>
          <hr />
        </div>

        <div className="flex flex-col mb-14">
          <p className="font-bold">Choose category</p>
          <div className="flex items-center gap-x-3 overflow-x-auto py-4">
            {renderedCategories}
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

export default ToWatchModal;
