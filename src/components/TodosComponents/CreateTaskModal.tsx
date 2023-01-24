import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import createTaskModalActions, {
  selectIsOpen,
} from "../../store/slices/createTaskSlice";

const CreateTaskModal = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpen);

  const componentStyle = isOpen ? "flex" : "hidden";

  const onCloseClick = () => {
    dispatch(createTaskModalActions.closeModal());
  };

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
            className="w-full h-[100px] resize-none text-3xl"
            placeholder="Enter a task..."
          />
          <hr />
        </div>

        <div className="flex flex-col gap-y-5 mb-14">
          <p className="font-bold">Choose category</p>
          <div className="flex items-center gap-x-8 overflow-x-scroll">
            <div className="flex items-center gap-x-2 cursor-pointer">
              <span className="w-2 h-6 bg-[#EEAA88]" />
              <p>Work</p>
            </div>
            <div className="flex items-center gap-x-2 cursor-pointer">
              <span className="w-2 h-6 bg-[#468499]" />
              <p>House</p>
            </div>
            <div className="flex items-center gap-x-2 cursor-pointer">
              <span className="w-2 h-6 bg-[#FFC6C6]" />
              <p>Shop</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button className="px-10 py-2 rounded-lg bg-gradient-to-r from-[#406ffa] to-[#2948ff] text-gray-200">
            New Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;
