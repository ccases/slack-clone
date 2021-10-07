import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthAPI from "../Services/AuthAPI";
import Dashboard from '../components/Dashboard/Dashboard'

const AuthRoutes = ({ component: Component, ...rest }) => {
  return (
    <>
      {/* {AuthAPI.isAuthenticated() && {Dashboard}} */}
      <Route
        {...rest}
        render={(props) => {
          if (AuthAPI.isAuthenticated()) {
            return <Component {...props} />;
          } else {
            return <Redirect
                to={{
                  pathname: "/",
                  state: {
                    from: props.location,
                  },
                }}
              />
          }
        }}
      />
    </>
  );
};

export default AuthRoutes;
