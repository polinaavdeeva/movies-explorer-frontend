import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRouteElement({ loggedIn, element: Component, ...props }) {
  const location = useLocation();
  const navigate = <Navigate to="/" replace />;
  const component = <Component {...props} />;
  const isRegPath = location.pathname === "/signup" || location.pathname === "/signin";

  if (loggedIn) {
    if (isRegPath) {
      return navigate;
    } else {
      return component;
    }
  } else {
    if (isRegPath) {
      return component;
    } else {
      return navigate;
    }
  }
}

export default ProtectedRouteElement;
