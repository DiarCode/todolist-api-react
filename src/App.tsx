import React from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import CreateTaskModal from "./components/TodosComponents/CreateTaskModal";

function App() {
  return (
    <>
      <CreateTaskModal />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
