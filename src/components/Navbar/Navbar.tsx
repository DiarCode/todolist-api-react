import React from "react";
import { navbarLinks } from "../../constants/links";
import { Link, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux.hooks";
import authActions from "../../store/slices/authSlice";

const Navbar = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const onLogoutClick = () => {
    dispatch(authActions.removeAuth());
    localStorage.clear();
  };

  const renderedNavbarLinks = navbarLinks.map((link, index) => {
    const isPathMatch = pathname === link.path;
    const linkStyle = isPathMatch ? "text-[#406ffa] underline" : "";
    return (
      <Link key={index} to={link.path}>
        <p className={linkStyle}>{link.value}</p>
      </Link>
    );
  });

  return (
    <div className="w-full flex items-center justify-between">
      <div className="font-semibold text-[#406ffa] cursor-pointer text-lg uppercase mr-6">
        <Link to="/">Todoom</Link>
      </div>
      <div className="flex items-center gap-x-7 uppercase text-gray-400 overflow-auto">
        {renderedNavbarLinks}

        <button onClick={onLogoutClick}>
          <p className="uppercase text-gray-400">Logout</p>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
