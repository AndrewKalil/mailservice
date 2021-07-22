//styles
import {
  Tab1Container,
  ConfigurationsContainer,
  EmailsContainer,
  LogsBtn,
  ContentContainer,
  ContentWrapper,
  Logs,
} from "./ServidoresDeCorreoElements";
import { Button, ModalButtons } from "../../ReusableStyles";

//widgets
import { Scrollbar } from "../../widgets/ReactScrollbar";
import { Modal } from "../../widgets/Popup";
import { Loader } from "../../widgets/Loader";

//reducer
import { useSelector, useDispatch } from "react-redux";
import {
  email,
  getNatures,
  getAreas,
  getServices,
  getInboxesByClientId,
  getLogsByClientId,
  addEmailTemplate,
  handleAlert,
} from "../../../store/modules/EmailStore";
import { useEffect, useState } from "react";
import { user } from "../../../store/modules/UserStore";

//components
import { Log } from "./Log";
import { NewEmail } from "./newEmail";

// import { useState } from "react";

/*
Main rendered coponent which renders the following:
    * NewEmail: React.FC
*/
const ServidoresDeCorreo = () => {
  const emailState = useSelector(email);
  const userDetails = useSelector(user);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(getInboxesByClientId(emailState.clientSettings.id));
    dispatch(getLogsByClientId(emailState.clientSettings.id));
    dispatch(getNatures());
    dispatch(getAreas());
    dispatch(getServices());
  }, [dispatch, userDetails.username, emailState.clientSettings.id]);

  const logsReversed = [...emailState.logs];

  return (
    <Tab1Container>
      <h6>Configuración de uso:</h6>
      <Modal active={openModal} setModalActive={setOpenModal}>
        <ContentContainer>
          <Scrollbar height="100%">
            <ContentWrapper>
              <h4 style={{ textAlign: "center", textJustify: "center" }}>
                Estos son los{" "}
                <span
                  style={{
                    color: "#00B446",
                  }}
                >
                  logs
                </span>{" "}
                de tu MailService
              </h4>
              <p style={{ fontSize: "14px" }}>
                visualizando todos los registros de tu consola de mailservice
              </p>
              <Logs>
                {logsReversed.reverse().map((item, index) => {
                  return <Log key={index} features={item} />;
                })}
              </Logs>
            </ContentWrapper>
          </Scrollbar>
        </ContentContainer>
      </Modal>
      <Modal
        alert="true"
        active={emailState.alert.isOpen}
        // setModalActive={setDeleteModal}
        height="200px"
        width="500px"
      >
        <ContentContainer spaceBetween>
          <h4>{emailState.alert.content}</h4>
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
      <LogsBtn absolute="true" to="#" onClick={() => setOpenModal(!openModal)}>
        Ver Logs
      </LogsBtn>
      <ConfigurationsContainer>
        {emailState.loading.loadingInboxes ? (
          <Loader />
        ) : (
          <Scrollbar height="100%">
            <EmailsContainer>
              {emailState.emailsList.map((email) => {
                //   console.log(email);
                return <NewEmail key={email.id} email={email} />;
              })}
            </EmailsContainer>
          </Scrollbar>
        )}
        <div>
          <Button
            marginTop="10px"
            onClick={() => {
              if (
                emailState.emailsList.length <
                emailState.clientSettings.maxInboxLength
              ) {
                dispatch(addEmailTemplate());
              } else {
                dispatch(
                  handleAlert({
                    isOpen: true,
                    content: `Ha llegado al limite de buzones creados: ${emailState.clientSettings.maxInboxLength}`,
                  })
                );
              }
            }}
          >
            Agregar Correo
          </Button>
        </div>
      </ConfigurationsContainer>
      {/* {emailState.tooManyEmailsAlert && <h1>Too many emails</h1>} */}
    </Tab1Container>
  );
};

export default ServidoresDeCorreo;
