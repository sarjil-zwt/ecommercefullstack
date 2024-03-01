import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "../loader/Loader";

const ProtectedRoute = ({ loading }) => {
  const userState = useSelector((state) => state.userState);

  const location = useLocation();

  if (!loading) {
    return userState.isLoggedIn ? (
      <Outlet />
    ) : (
      <Navigate to={`/login?refer=${location.pathname}`} />
    );
  } else {
  }
};

export default ProtectedRoute;
