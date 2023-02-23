import React, { useState } from "react";
import UserIcon from "../Icons/UserIcon";
import { useAppSelector } from "../../hooks/redux.hooks";
import { selectAuthUser } from "../../store/slices/authSlice";
import { uploadAvatarByUserId } from "../../api/user/user.api";
import UploadSolid from "../Icons/UploadSolid";
import { useNavigate } from "react-router-dom";

const SidebarUserInfo = () => {
  const user = useAppSelector(selectAuthUser);
  const [avatarHovered, setAvatarHovered] = useState(false);
  const nav = useNavigate();

  const ps = avatarHovered
    ? "w-16 h-16 relative bg-black bg-opacity-70 rounded-full"
    : "w-16 h-16 relative";
  const isAvatarExist = user?.avatar !== "";

  const renderedAvatar = isAvatarExist ? (
    <img src={user?.avatar} alt={user?.name} />
  ) : (
    <UserIcon />
  );

  const onImageUpload = async e => {
    const file = e.target.files[0];

    if (user === null || file === null) {
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    const res = await uploadAvatarByUserId(user.id, formData);

    if (res.codes !== 200) {
      console.log(res);
      return;
    }

    nav(0);
  };

  return (
    <div className="flex items-center flex-col gap-y-4">
      <div
        className={ps}
        onMouseEnter={() => setAvatarHovered(true)}
        onMouseLeave={() => setAvatarHovered(false)}
      >
        <div
          className="absolute w-16 h-16 flex justify-center items-center"
          style={{
            visibility: avatarHovered ? "visible" : "hidden",
          }}
        >
          <UploadSolid />
        </div>
        <input
          onChange={onImageUpload}
          type="file"
          accept="image/png, image/jpeg"
          className="absolute -top-1 -bottom-1 -right-1 -left-1 opacity-0 z-50 w-16"
        />
        {renderedAvatar}
      </div>
      <div className="flex items-center flex-col gap-y-1">
        <p>{user?.name}</p>
        <p className="text-gray-400">{user?.email}</p>
      </div>
    </div>
  );
};

export default SidebarUserInfo;
