import { useEffect, useState } from "react";

//styles for this page
import {
  MainPageContainer,
  MainDiv,
  TabButtons,
  TabButton,
} from "./MainPageStyles";

// components to import
import Tab1 from "../../components/MainPageComponents/ServidoresDeCorreo/ServidoresDeCorreo";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, user } from "../../store/modules/UserStore";
import { getClientSettings } from "../../store/modules/EmailStore";

export const ServidoresDeCorreo = () => {
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();
  const userDetails = useSelector(user);

  useEffect(() => {
    dispatch(getUserDetails());
    dispatch(getClientSettings(userDetails.username));
  }, [dispatch, userDetails.username]);

  return (
    <MainPageContainer>
      <TabButtons>
        <TabButton
          isActive={tab === 0}
          onClick={() => {
            setTab(0);
          }}
        >
          SERVIDORES DE CORREO
        </TabButton>
        <TabButton isActive={tab === 1}></TabButton>
        <TabButton isActive={tab === 2}></TabButton>
        <TabButton isActive={tab === 3}></TabButton>
      </TabButtons>
      <MainDiv>{tab === 0 && <Tab1 />}</MainDiv>
    </MainPageContainer>
  );
};
