import React from "react";
import Sidebar from "../components/ToWatchComponents/Sidebar";
import Content from "../components/ToWatchComponents/Content";
import Layout from "../components/Layout/Layout";

const ToWatchPage = () => {
  return (
    <Layout title={"Towatch"}>
      <div className="w-4/5 h-4/5 bg-gray-100 rounded-lg">
        <div className="grid grid-cols-4 h-full w-full">
          <Sidebar />
          <Content />
        </div>
      </div>
    </Layout>
  );
};

export default ToWatchPage;
