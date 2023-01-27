import React, { useEffect } from "react";
import HomePage from "./pages/HomePage";
import TodosPage from "./pages/TodosPage";
import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import { useAppDispatch } from "./store/store";
import todosActions from "./store/slices/todosTasksSlice";
import { todosData } from "./mock/todos";
import ToWatchPage from "./pages/ToWatchPage";
import AuthProtectedRoutes from "./pages/ProtectedRoutes/AuthProtectedRoutes";

const ToWatchModal = React.lazy(
  () => import("./components/ToWatchComponents/Modals/TowatchModal")
);
const CreateTaskModal = React.lazy(
  () => import("./components/TodosComponents/Modals/CreateTaskModal")
);
const CreateCategoryModal = React.lazy(
  () => import("./components/TodosComponents/Modals/CreateCategoryModal")
);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(todosActions.initTodos({ todos: todosData }));
  }, [dispatch]);

  return (
    <>
      <ToWatchModal />
      <CreateTaskModal />
      <CreateCategoryModal />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<AuthProtectedRoutes />}>
          <Route path="/todo" element={<TodosPage />} />
          <Route path="/towatch" element={<ToWatchPage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </>
  );
}

export default App;
