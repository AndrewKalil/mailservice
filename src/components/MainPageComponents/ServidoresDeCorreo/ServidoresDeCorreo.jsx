//styles
import {
  Tab1Container,
  ConfigurationsContainer,
  EmailContainer,
  EmailsContainer,
  OptionsContainer,
  OptionButton,
  EmailWrapper,
  InputFields,
  InputField,
  Input,
  InputShow,
  LogsBtn,
  ContentContainer,
  ContentWrapper,
  Logs,
  LogContainer,
  LogBody,
  Photo,
  LogInfo,
  ReglaContainer,
  ReglasInputField,
  Reglas,
  CheckInput,
  PartialOptionsContainer,
} from "./ServidoresDeCorreoElements";
import { Button } from "../../ReusableStyles";

//widgets
import { Scrollbar } from "../../widgets/ReactScrollbar";
import { CustomSelect } from "../../widgets/ReactSelect";
import Switch from "react-switch";
import { Modal } from "../../widgets/Popup";

//svgs
import { Basura } from "../../Svg/Basura";
import { Guardar } from "../../Svg/Guardar";
import { Lapiz } from "../../Svg/Lapiz";
import { SinAsignar } from "../../Svg/SinAsignar";
import { Calendar } from "../../Svg/Calendario";

//reducer
import { useSelector, useDispatch } from "react-redux";
import {
  //   addEmailCount,
  editEmailFields,
  email,
  getNatures,
  getAreas,
  getServices,
  getInboxesByClientId,
  getRulesByInboxId,
  getLogsByClientId,
  addEmailTemplate,
  createInbox,
} from "../../../store/modules/EmailStore";
import { useEffect, useRef, useState } from "react";
import { user } from "../../../store/modules/UserStore";

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
  }, [dispatch, userDetails.username, emailState.clientSettings.id]);

  return (
    <Tab1Container>
      <h6>Configuración de uso:</h6>
      <Modal active={openModal} setModalActive={setOpenModal}>
        <ContentContainer>
          <Scrollbar height="100%">
            <ContentWrapper>
              <h4 style={{ textAlign: "center", textJustify: "center" }}>
                Estás son los{" "}
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut
              </p>
              <Logs>
                {[1, 1, 1, 1, 1, 1, 1].map((item, index) => {
                  return <Log key={index} />;
                })}
              </Logs>
            </ContentWrapper>
          </Scrollbar>
        </ContentContainer>
      </Modal>
      <LogsBtn to="#" onClick={() => setOpenModal(!openModal)}>
        Ver Logs
      </LogsBtn>
      <ConfigurationsContainer>
        <Scrollbar height="100%">
          <EmailsContainer>
            {emailState.emailsList.map((email) => {
              //   console.log(email);
              return <NewEmail key={email.id} email={email} />;
            })}
          </EmailsContainer>
        </Scrollbar>
        <div>
          <Button
            marginTop="10px"
            onClick={() => {
              dispatch(addEmailTemplate());
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

/*
Email coponent which renders the following:
    * Email ContentWrapper
*/
const NewEmail = (props) => {
  const {
    id,
    emailText,
    tipoDeServidor,
    otherRoute,
    port,
    portNumber,
    recentlyCreated,
  } = props.email;
  const [edit, setEdit] = useState(false);
  const emailState = useSelector(email);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);

  // inital rendered info
  const [editedEmail, setEditedEmail] = useState(emailText);
  const [serverType, setServerType] = useState(tipoDeServidor);
  const [isSllOn, setIsSslOn] = useState(port);
  const [puerto, setPuerto] = useState(portNumber);
  const [showOthers, setShowOthers] = useState(false);
  const [serverRoute, setServerRoute] = useState(otherRoute);
  const [password, setPassword] = useState("");

  const options = [
    {
      Icon: Lapiz,
      action: () => {
        setEdit(!edit);
      },
      id: 0,
    },
    {
      Icon: Basura,
      action: () => {
        const newEmailList = emailState.emailsList.filter(
          (item) => item.id !== id
        );
        dispatch(editEmailFields(newEmailList));
        console.log(newEmailList);
        setEdit(false);
      },
      id: 1,
    },
    {
      Icon: Guardar,
      action: () => {
        // let newEmailList = [...emailState.emailsList];
        // const removeIdx = newEmailList.indexOf(
        //   newEmailList.filter((item) => item.id === id)[0]
        // );
        // newEmailList[removeIdx] = {
        //   id: id,
        //   emailText: editedEmail,
        //   tipoDeServidor: serverType,
        //   ssl: isSllOn,
        //   otherRoute: showOthers ? serverRoute : "",
        //   puerto: showOthers ? puerto : "",
        // };

        // // console.log(newEmailList);
        // dispatch(editEmailFields(newEmailList));
        if (recentlyCreated) {
          let newInbox = {
            clientId: emailState.clientSettings.id,
            username: editedEmail,
            password: password,
            server: serverRoute,
            port: isSllOn,
            serverType: serverType,
          };
          dispatch(createInbox(id, newInbox));
        }
      },
      id: 2,
    },
  ];

  // toggles edit off when click outside of components
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setEdit(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, setEdit]);

  const handleSwitch = () => {
    if (edit) {
      if (isSllOn) {
        setIsSslOn(false);
        setPuerto(557);
      } else {
        setIsSslOn(true);
        setPuerto(993);
      }
    }
  };

  const handleServerChange = (e) => {
    // console.log(e);
    setServerType(e);
    if (e.label === "Otro") {
      setShowOthers(true);
      setIsSslOn(false);
    } else {
      setShowOthers(false);
    }
  };

  return (
    <EmailContainer edit={edit} ref={wrapperRef}>
      <Modal active={openModal} setModalActive={setOpenModal}>
        <ContentContainer>
          <Scrollbar height="100%">
            <ContentWrapper>
              <h4 style={{ textAlign: "center", textJustify: "center" }}>
                Estás son las{" "}
                <span
                  style={{
                    color: "#00B446",
                  }}
                >
                  reglas
                </span>{" "}
                del correo {editedEmail}
                <span
                  style={{
                    color: "#00B446",
                  }}
                >
                  {editedEmail}
                </span>{" "}
              </h4>
              <p style={{ fontSize: "14px" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut
              </p>
              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Button bg="#00B446">Agregar Regla</Button>
              </div>
              <Reglas>
                {emailState.reglas.map((item, index) => {
                  return <Regla key={index} features={item} />;
                })}
              </Reglas>
            </ContentWrapper>
          </Scrollbar>
        </ContentContainer>
      </Modal>
      <OptionsContainer>
        {options.map((option) => {
          const { Icon, id, action } = option;
          return (
            <OptionButton key={id} onClick={() => action()}>
              <Icon size={15} />
            </OptionButton>
          );
        })}
      </OptionsContainer>
      <EmailWrapper>
        <InputFields>
          <InputField>
            <label>Correo:</label>
            {edit ? (
              <Input
                placeholder="example@gmail.com"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
            ) : (
              <InputShow>
                <p>{editedEmail}</p>
              </InputShow>
            )}
            <LogsBtn
              to="#"
              onClick={() => {
                dispatch(getRulesByInboxId(id));
                setOpenModal(!openModal);
              }}
            >
              Ver Reglas
            </LogsBtn>
          </InputField>
        </InputFields>
        <InputFields>
          <InputField>
            <label>Tipo de servidor:</label>
            {edit ? (
              <CustomSelect
                value={serverType}
                onChange={(e) => handleServerChange(e)}
                placeholder="Selecciona el tipo de servidor..."
                options={emailState.serversList}
              />
            ) : (
              <InputShow>
                <p>{serverType.label}</p>
              </InputShow>
            )}
          </InputField>
          {showOthers && (
            <InputField>
              <label>Ruta del servidor:</label>
              {edit ? (
                <Input
                  placeholder="ingrese la ruta del servidor"
                  value={serverRoute}
                  onChange={(e) => setServerRoute(e.target.value)}
                />
              ) : (
                <InputShow>
                  <p>{serverRoute}</p>
                </InputShow>
              )}
            </InputField>
          )}
          <InputField>
            <label>Contraseña:</label>
            {edit ? (
              <Input
                type="password"
                placeholder="ingrese su contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            ) : (
              <InputShow>
                <p>{password !== "" ? "*******" : ""}</p>
              </InputShow>
            )}
          </InputField>
          <InputField>
            {showOthers ? <label>Puerto:</label> : <label>SSL:</label>}
            {!showOthers && edit ? (
              <Switch
                checked={isSllOn}
                onChange={() => handleSwitch()}
                checkedIcon={false}
                uncheckedIcon={false}
                onColor="#645ABE"
                size="14px"
              />
            ) : showOthers && edit ? (
              <Input
                placeholder="ingrese el puerto"
                value={puerto}
                onChange={(e) => {
                  setPuerto(e.target.value);
                }}
              />
            ) : (
              <InputShow>
                <p>{puerto}</p>
              </InputShow>
            )}
          </InputField>
        </InputFields>
      </EmailWrapper>
    </EmailContainer>
  );
};

const Log = () => {
  return (
    <LogContainer>
      <h6>INC - 2344 (Aqui iria el tipo de mensaje)</h6>
      <h5>Este seria el campo para el mensaje</h5>
      <LogBody>
        <Photo>
          <SinAsignar />
        </Photo>
        <LogInfo>
          <p>
            Correo asociado:{" "}
            <span style={{ color: "#3C6EBE", fontWeight: "bold" }}>
              LuciaM12gmail.com
            </span>
          </p>
          <span
            style={{
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              //   justifyContent: "center",
            }}
          >
            <Calendar size={14} /> El 28 Mayo de 2021 - 12:40 PM
          </span>
        </LogInfo>
      </LogBody>
    </LogContainer>
  );
};

const Regla = () => {
  const [keywords, setKeywords] = useState("");
  const [typo, setType] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const emailState = useSelector(email);
  const dispatch = useDispatch();

  const [selectedNature, setSelectedNature] = useState({
    label: "Seleccione la naturaleza",
    value: "",
  });
  const [selectedArea, setSelectedAreas] = useState({
    label: "Seleccione el area",
    value: "",
  });
  const [selectedService, setSelectedService] = useState({
    label: "Seleccione el servicio",
    value: "",
  });

  useEffect(() => {
    dispatch(getNatures());
    dispatch(getAreas());
    dispatch(getServices(selectedArea.value));
  }, [dispatch, selectedArea]);

  useEffect(() => {
    if (typo === "parcial") {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  }, [typo]);

  return (
    <ReglaContainer>
      <ReglasInputField>
        <label>Contiene Keywords:</label>
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ display: "flex", gap: "5px" }}>
            {/*  */}
            <CheckInput
              checked={keywords === true}
              onClick={() => setKeywords(true)}
            />
            <label>Si</label>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <CheckInput
              checked={keywords === false}
              onClick={() => setKeywords(false)}
            />
            <label>No</label>
          </div>
        </div>
      </ReglasInputField>
      {keywords === "si" && (
        <ReglasInputField>
          <label>Keywords:</label>
          <Input
            height="55px"
            placeholder="Escriba aquí los keyword, separados por comas (,)"
          />
        </ReglasInputField>
      )}
      <ReglasInputField>
        <label>Tipo de solicitud:</label>
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ display: "flex", gap: "5px" }}>
            <CheckInput
              checked={typo === "PARCIAL"}
              onClick={() => setType("PARCIAL")}
            />
            <label>Parcial</label>
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <CheckInput
              checked={typo === "COMPLETA"}
              onClick={() => setType("COMPLETA")}
            />
            <label>Completa</label>
          </div>
        </div>
      </ReglasInputField>
      {showOptions && (
        <PartialOptionsContainer>
          <CustomSelect
            onChange={(e) => setSelectedNature(e)}
            value={selectedNature}
            options={emailState.natures}
            placeholder="Natures..."
          />
          <CustomSelect
            onChange={(e) => setSelectedAreas(e)}
            value={selectedArea}
            options={emailState.areas}
            placeholder="Areas..."
          />
          <CustomSelect
            onChange={(e) => setSelectedService(e)}
            value={selectedService}
            options={emailState.services}
            placeholder="Services..."
          />
        </PartialOptionsContainer>
      )}
    </ReglaContainer>
  );
};
