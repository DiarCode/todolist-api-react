import React from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { Navigate } from "react-router";
import { selectAuthToken, selectAuthUser } from "../../store/slices/authSlice";

const AuthProtectedRoutes = () => {
  const user = useAppSelector(selectAuthUser);
  const token = useAppSelector(selectAuthToken);

  let isAuth = user !== null && token !== null;

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthProtectedRoutes;
