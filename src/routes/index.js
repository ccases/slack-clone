import React from "react";
import { Router, Redirect, Switch, withRouter } from "router-react-dom";

import LogIn from "../components/LogIn/LogIn";
import Dashboard from "../components/Dashboard/Dashboard";

import ProtectedRoute from "./ProtectedRoutes";
import AuthRoutes from "./AuthRoutes";

const routes = () => {
  return (
    <Switch>
      <ProtectedRoutes to="/" exact component={LogIn} />
      <AuthRoutes to="/Dashboard" exact component={Dashboard} />
    </Switch>
  );
};

export default withRouter(routes);
