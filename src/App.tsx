import React from "react";

// for in app routing (single page application)
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

// Styled components
import {
  AppContainer,
  AppInnerContainer,
} from "./components/AppContainerComponents/AppContainerElements";

// components
import { Navbar } from "./components/NavbarComponents/Navbar";
import { Footer } from "./components/FooterComponents/Footer";

//pages
import { ServidoresDeCorreo } from "./pages/MainPage";
import { Login } from "./pages/LoginPage";

// Widgets
import { Scrollbar } from "./components/widgets/ReactScrollbar";

// Private Routes
import PrivateRoute from "./components/Routes/PrivateRoutes";

import { TokenService } from "./services/LocalStorage";
import { useSelector } from "react-redux";
import { selectUser } from "./store/modules/AuthStore";

const App: React.FC = () => {
  // declaring a user which is coming from store
  const user = useSelector(selectUser);

  // initialize this variable as false
  let isAuthenticated = false;

  // if the token in the local strorage exist and it is not an empty string, then authorize user
  if (TokenService.get() !== "") isAuthenticated = true;

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated,
    authenticationPath: "/",
    redirectPath: "/",
    setRedirectPath: "/",
  };

  const Default = () => {
    return (
      <Router>
        <Switch>
          <Route
            {...defaultProtectedRouteProps}
            path="/"
            exact
            component={Login}
          />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  };

  const Dashboard = () => {
    return (
      <AppContainer>
        <Router>
          <Navbar />
          <AppInnerContainer>
            <Scrollbar height="100%">
              <Switch>
                <PrivateRoute
                  {...defaultProtectedRouteProps}
                  path="/"
                  exact
                  component={ServidoresDeCorreo}
                />
                {/* <Route component={NotFoundPage} /> */}
              </Switch>
            </Scrollbar>
          </AppInnerContainer>
          <Footer />
        </Router>
      </AppContainer>
    );
  };

  return (
    <>
      {" "}
      {user.error === "" && user.token !== "-1" ? (
        <Dashboard />
      ) : (
        <Default />
      )}{" "}
    </>
  );
};

export default App;
