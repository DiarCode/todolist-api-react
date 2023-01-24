import React from "react";

const TodoItem = ({ data }) => {
  const completedStyle =
    "p-3 rounded-full bg-[#406ffa] border-[0.5px] border-black";
  const defaultStyle = "border-[1px] p-3 rounded-full border-black";

  const buttonStyle = data.completed ? completedStyle : defaultStyle;

  return (
    <div
      className="flex items-center gap-x-4 mr-5
        hover:p-2 hover:px-4 hover:bg-[#ebeef9] hover:cursor-pointer
        rounded-lg transition-all duration-300"
    >
      <div className="flex">
        <span className={buttonStyle} />
      </div>
      <div>
        <p>{data.title}</p>
        <p className="text-gray-400 text-sm">{data.created_at}</p>
      </div>
    </div>
  );
};

export default TodoItem;
