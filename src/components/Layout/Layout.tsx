import React from "react";

const Layout = ({ children, title }) => {
  React.useEffect(() => {
    document.title = `${title} | Todoom`;
  }, [title]);

  return (
    <div
      className="w-full h-screen overflow-hidden flex items-center justify-center 
  bg-gradient-to-r from-[#406ffa] to-[#2948ff] font-normal text-base"
    >
      {children}
    </div>
  );
};

export default Layout;
