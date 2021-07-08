import { Redirect, Route, useLocation } from "react-router";

const PrivateRoute = ({
  isAuthenticated,
  authenticationPath,
  ...routeProps
}: ProtectedRouteProps) => {
  const { pathname, search } = useLocation();
  if (isAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={`?redirect=${pathname}${search}`} />;
  }
};

export default PrivateRoute;
