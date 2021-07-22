import React, { useEffect } from "react";

// for in app routing (single page application)
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  //   Redirect,
  //   Route,
  //   Route,
  //   Redirect,
  Switch,
  //   useParams,
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

// Widgets
import { Scrollbar } from "./components/widgets/ReactScrollbar";

// Private Routes
import PrivateRoute from "./components/Routes/PrivateRoutes";

import { TokenService } from "./services/LocalStorage";
import { useDispatch, useSelector } from "react-redux";
import {
  auth,
  checkToken,
  handleAlert,
  selectUser,
  setToken,
} from "./store/modules/AuthStore";
// import { Login } from "./pages/LoginPage";
import { getUserDetails } from "./store/modules/UserStore";
import { Modal } from "./components/widgets/Popup";
import { ContentContainer } from "./components/MainPageComponents/ServidoresDeCorreo/ServidoresDeCorreoElements";
import { ModalButtons } from "./components/ReusableStyles";

// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

const App: React.FC = () => {
  //   let query = useQuery();
  //   const token = query.get("token");
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  //   const cliCod = urlParams.get("cliCod");

  // declaring a user which is coming from store
  const user = useSelector(selectUser);
  const authState = useSelector(auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkToken(token));
    dispatch(setToken(token));
    dispatch(getUserDetails(token));
  }, [dispatch, token]);

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

  const NoToken = () => {
    return (
      <Modal
        alert="true"
        active={authState.alert.isOpen}
        // setModalActive={setDeleteModal}
        height="200px"
        width="500px"
      >
        <ContentContainer spaceBetween>
          <h4>{authState.alert.content}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ModalButtons
              bg="#00B446"
              onClick={() => {
                dispatch(handleAlert({ isOpen: false, content: "" }));
              }}
            >
              Entendido
            </ModalButtons>
          </div>
        </ContentContainer>
      </Modal>
    );
  };

  const Default = () => {
    return (
      <Router basename="/mailservice">
        <Switch>
          <Route
            {...defaultProtectedRouteProps}
            path="/"
            exact
            component={NoToken}
          />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  };

  const Dashboard = () => {
    return (
      <AppContainer>
        <Router basename="/mailservice">
          <Navbar />
          <AppInnerContainer>
            <Scrollbar height="100%">
              <Switch>
                <PrivateRoute
                  {...defaultProtectedRouteProps}
                  path={`/`}
                  //   path="/"
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
    <> {user.error === "" && user.tokenValid ? <Dashboard /> : <Default />} </>
  );
};

export default App;
