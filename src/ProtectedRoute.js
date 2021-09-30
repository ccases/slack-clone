import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./Auth";

function ProtectedRoute({ component: Component, ...rest }) {
  const { authTokens } = useAuth();
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          authTokens ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{ pathname: "/", state: { referer: props.location } }}
            />
          );
        }}
      />
    </div>
  );
}

export default ProtectedRoute;
