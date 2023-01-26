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

      <div className="h-full py-7">
        <div className="flex items-center gap-x-3 mb-2">
          <span className={`w-2 h-8`} />
          <p className="text-2xl">Animes</p>
        </div>

        <div className="h-fit">
          <ToWatchList />
        </div>
      </div>
    </div>
  );
};

export default Content;
