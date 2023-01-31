import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import createTaskModalActions, {
  selectIsTodosOpen,
} from "../../../store/slices/createTaskSlice";
import { categoriesData } from "../../../mock/categories";

const CreateTaskModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsTodosOpen);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [todoTitle, setTodoTitle] = useState<string>("");

  const componentStyle = isOpen ? "flex" : "hidden";

  const onCloseClick = () => {
    dispatch(createTaskModalActions.closeTodosModal());
  };

  const onSelectCategory = (id: number) => {
    setSelectedCategoryId(id);
  };

  const onTitleChange = (title: string) => {
    setTodoTitle(title);
  };

  const onResetAllParameters = () => {
    setSelectedCategoryId(null);
    setTodoTitle("");
  };

  const onFormSubmit = () => {
    const checkValues = [todoTitle, selectedCategoryId];

    if (!checkValues.every(value => value != null && value !== "")) {
      console.log("error");
      return;
    }

    const obj = {
      title: todoTitle,
      category_id: selectedCategoryId,
    };

    console.log(obj);
    dispatch(createTaskModalActions.closeTodosModal());
    onResetAllParameters();
  };

  const renderedCategories = categoriesData.map((category, index) => {
    const isCategorySelected = selectedCategoryId === category.id;

    let componentStyle = "flex items-center gap-x-2 cursor-pointer";
    if (isCategorySelected) {
      componentStyle +=
        " text-gray-100 bg-[#ebeef9] text-black rounded-md px-3 py-[2px]";
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
          <textarea
            value={todoTitle}
            onChange={e => onTitleChange(e.target.value)}
            className="w-full h-[100px] resize-none text-4xl"
            placeholder="Enter a task..."
          />
          <hr />
        </div>

        <div className="flex flex-col mb-14">
          <p className="font-bold">Choose category</p>
          <div className="flex items-center gap-x-8 overflow-x-auto py-6">
            {renderedCategories}
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={onFormSubmit}
            className="px-10 py-2 rounded-lg bg-gradient-to-r from-[#406ffa] to-[#2948ff] text-gray-200"
          >
            New Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
