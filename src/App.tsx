import React, { useEffect } from "react";
import HomePage from "./pages/HomePage";
import TodosPage from "./pages/TodosPage";
import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import CreateTaskModal from "./components/TodosComponents/CreateTaskModal";
import { useAppDispatch } from "./store/store";
import todosActions from "./store/slices/todosTasksSlice";
import { todosData } from "./mock/todos";
import ToWatchPage from "./pages/ToWatchPage";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(todosActions.initTodos({ todos: todosData }));
  }, [dispatch]);

  return (
    <>
      <CreateTaskModal />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todo" element={<TodosPage />} />
        <Route path="/towatch" element={<ToWatchPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
