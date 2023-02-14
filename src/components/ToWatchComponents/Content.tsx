import React from "react";
import Navbar from "../Navbar/Navbar";
import ToWatchList from "./ToWatchList";

const Content = () => {
  return (
    <div className="col-span-3 h-full w-full p-7 flex flex-col">
      <div className="flex justify-end pb-7">
        <Navbar />
      </div>

      <hr />

      <ToWatchList />
    </div>
  );
};

export default Content;
