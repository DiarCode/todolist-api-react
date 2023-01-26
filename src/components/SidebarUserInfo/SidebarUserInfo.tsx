import React from "react";
import UserIcon from "../Icons/UserIcon";

const SidebarUserInfo = () => {
  return (
    <div className="flex items-center flex-col gap-y-4">
      <UserIcon />
      <div className="flex items-center flex-col gap-y-1">
        <p>Diar Begisbayev</p>
        <p className="text-gray-400">diar@gmail.com</p>
      </div>
    </div>
  );
};

export default SidebarUserInfo;
