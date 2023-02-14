import React from "react";
import HomePage from "../pages/HomePage";
import TodosPage from "../pages/TodosPage";
import LoginPage from "../pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "../pages/SignUpPage";
import ToWatchPage from "../pages/ToWatchPage";
import AuthProtectedRoutes from "../pages/ProtectedRoutes/AuthProtectedRoutes";
import { getUserById } from "../api/user/user.api";
import authSliceActions from "../store/slices/authSlice";
import { useAppDispatch } from "../hooks/redux.hooks";

const ToWatchModal = React.lazy(
  () => import("../components/ToWatchComponents/Modals/TowatchModal")
);
const CreateTaskModal = React.lazy(
  () => import("../components/TodosComponents/Modals/CreateTaskModal")
);
const CreateCategoryModal = React.lazy(
  () => import("../components/TodosComponents/Modals/CreateCategoryModal")
);
const CreateTowatchCategoryModal = React.lazy(
  () => import("../components/ToWatchComponents/Modals/TowatchCategoryModal")
);

function App() {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (async function initUser() {
      const user_id = JSON.parse(localStorage.getItem("user_id") || "");
      const token = JSON.parse(localStorage.getItem("token") || "");

      if (user_id == null || token == null) {
        return;
      }

      const res = await getUserById(user_id);
      if (res.code === 200) {
        dispatch(authSliceActions.setAuth({ user: res.data, token }));
      }
    })();
  }, [dispatch]);

  return (
    <>
      <ToWatchModal />
      <CreateTaskModal />
      <CreateCategoryModal />
      <CreateTowatchCategoryModal />

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
