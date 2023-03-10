import React from "react";
import Layout from "../components/Layout/Layout";
import Sidebar from "../components/TodosComponents/Sidebar";
import Content from "../components/TodosComponents/Content";

const HomePage = () => {
  return (
    <Layout title={"Todos"}>
      <div className="w-full lg:w-4/5 h-4/5 bg-gray-100 rounded-lg">
        <div className="grid grid-cols-4 h-full w-full">
          <Sidebar />
          <Content />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
