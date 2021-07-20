import React, { useContext } from "react";
import "react-toastify/dist/ReactToastify.css";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //   const notify = (message) => {
  //     toast(message, {
  //       position: "top-right",
  //       autoClose: 3500,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   };

  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};

// custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
