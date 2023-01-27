import React from "react";
import { useLocation, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { Navigate } from "react-router";
import { selectAuthToken, selectAuthUser } from "../../store/slices/authSlice";

const AuthProtectedRoutes = () => {
  const user = useAppSelector(selectAuthUser);
  const token = useAppSelector(selectAuthToken);
  const location = useLocation();

  let isAuth = user !== null && token !== null;
  isAuth = true;

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default AuthProtectedRoutes;
