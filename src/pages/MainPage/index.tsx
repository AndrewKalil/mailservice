import { useEffect, useState } from "react";

//styles for this page
import {
  MainPageContainer,
  MainDiv,
  TabButtons,
  TabButton,
} from "./MainPageStyles";

// components to import
import Tab1 from "../../components/MainPageComponents/ServidoresDeCorreo";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../../store/modules/UserStore";
import { getClientSettings } from "../../store/modules/EmailStore";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const ServidoresDeCorreo = () => {
  let query = useQuery();
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();
  const userDetails = useSelector(user);

  const cliCod = query.get("cliCod");

  useEffect(() => {
    dispatch(getClientSettings(userDetails.username, cliCod));
  }, [dispatch, userDetails.username, cliCod]);

  return (
    <MainPageContainer>
      <TabButtons>
        <TabButton
          isActive={tab === 0}
          onClick={() => {
            setTab(0);
          }}
        >
          Servidores de correo
        </TabButton>
        <TabButton isActive={tab === 1}></TabButton>
        <TabButton isActive={tab === 2}></TabButton>
        <TabButton isActive={tab === 3}></TabButton>
      </TabButtons>
      <MainDiv>{tab === 0 && <Tab1 />}</MainDiv>
      <ToastContainer
        position="bottom-left"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ display: "none" }}
      />
      <ToastContainer />
    </MainPageContainer>
  );
};
