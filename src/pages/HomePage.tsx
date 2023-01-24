import React from "react";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import Layout from "../components/Layout";

const HomePage = () => {
  return (
    <Layout>
      <div className="w-4/5 h-4/5 bg-gray-100 rounded-lg">
        <div className="grid grid-cols-4 h-full w-full">
          <Sidebar />
          <Content />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
