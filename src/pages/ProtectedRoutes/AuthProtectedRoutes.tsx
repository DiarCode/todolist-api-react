import React from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux.hooks";
import { Navigate } from "react-router";
import { selectAuthToken, selectAuthUser } from "../../store/slices/authSlice";

const AuthProtectedRoutes = () => {
  const user = useAppSelector(selectAuthUser);
  const token = useAppSelector(selectAuthToken);

  const isAuth = user !== null && token !== null;
  // const isAuth = true;

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthProtectedRoutes;
