import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// importing global context
import { AppProvider } from "./context";
import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <AppProvider>
        <App />
      </AppProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
