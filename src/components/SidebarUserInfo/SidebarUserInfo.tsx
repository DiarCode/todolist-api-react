import React from "react";
import UserIcon from "../Icons/UserIcon";
import { useAppSelector } from "../../store/store";
import { selectAuthUser } from "../../store/slices/authSlice";

const SidebarUserInfo = () => {
  const user = useAppSelector(selectAuthUser);
  return (
    <div className="flex items-center flex-col gap-y-4">
      <UserIcon />
      <div className="flex items-center flex-col gap-y-1">
        <p>{user.name}</p>
        <p className="text-gray-400">{user.email}</p>
      </div>
    </div>
  );
};

export default SidebarUserInfo;
