import React from "react";
import { navbarLinks } from "../../shared/links";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  console.log(pathname);
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
      <div className="font-semibold text-[#406ffa] cursor-pointer text-lg uppercase">
        <Link to="/">Todoom</Link>
      </div>
      <div className="flex items-center gap-x-7 uppercase text-gray-400">
        {renderedNavbarLinks}
      </div>
    </div>
  );
};

export default Navbar;
