import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthAPI from "../Services/AuthAPI";

const ProtectedRoutes = ({ component: Component, ...rest }) => {
  return (
  <div>
    <Route
      {...rest}
      render={(props) => {
        if (!AuthAPI.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/Dashboard",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  </div>

  );
};

export default ProtectedRoutes;
