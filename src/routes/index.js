import React from "react";
import { Switch, withRouter } from "react-router-dom";

import LogIn from "../components/LogIn/LogIn.js";
import Dashboard from "../components/Dashboard/Dashboard.js";

import ProtectedRoutes from "./ProtectedRoutes";
import AuthRoutes from "./AuthRoutes";

const routes = () => {
  return (
      <Switch>
        <ProtectedRoutes path="/" exact component={LogIn} />
        <AuthRoutes path="/Dashboard" exact component={Dashboard} />
      </Switch>
  );
};

export default withRouter(routes);
