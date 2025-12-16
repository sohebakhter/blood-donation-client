import React, { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./AuthContext";
import Loading from "../Components/Loading";

// import Loading from "../Components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    // return <Loading></Loading>;
    return <Loading></Loading>; //auth state dhore rekhte khubi dorkari
  }
  if (user) {
    return children;
  }
  return <Navigate state={location?.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;
