import React, { useEffect } from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "./app/store/hook";
import { refreshToken, setAccessToken } from "./app/store/feature/userSlice";
import { jwtDecode } from "jwt-decode";
import { logins } from "./app/store/feature/authSlice";

const ProtectedRoute = ({ element, requiredRole, children }: any) => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const userRole = useAppSelector((state) => state.auth.id);
  const accessToken = useAppSelector((state) => state.users.accessToken);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(refreshToken());
  //   if (accessToken) {
  //     const decode = jwtDecode(accessToken);
  //     console.log(decode);
  //     dispatch(logins({ role: decode.role }));
  //   }
  // }, [dispatch, accessToken]);

  // if (!isLoggedIn) {
  //   console.log("nyusahin" + isLoggedIn);
  //   return <Navigate to="/" />;
  // }

  // if (requiredRole && userRole !== requiredRole) {
  //   console.log("nyusahin" + userRole);
  //   return <Navigate to="/" />;
  // }
  console.log(userRole);
  return children;
};
export default ProtectedRoute;
