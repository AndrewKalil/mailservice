//styles
import {
  EmailContainer,
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
  Reglas,
} from "./ServidoresDeCorreoElements";
import { Button, ModalButtons } from "../../ReusableStyles";

//widgets
import { Scrollbar } from "../../widgets/ReactScrollbar";
import { CustomSelect } from "../../widgets/ReactSelect";
import Switch from "react-switch";
import { Modal } from "../../widgets/Popup";
import { Loader } from "../../widgets/Loader";

//svgs
import { Basura } from "../../Svg/Basura";
import { Guardar } from "../../Svg/Guardar";
import { Lapiz } from "../../Svg/Lapiz";

//reducer
import { useSelector, useDispatch } from "react-redux";
import {
  //   addEmailCount,
  editEmailFields,
  email,
  getRulesByInboxId,
  createInbox,
  deleteInbox,
  editInbox,
  addRuleTempplate,
  handleAlert,
} from "../../../store/modules/EmailStore";
import { useEffect, useRef, useState } from "react";
import { Regla } from "./regla";

/*
Email coponent which renders the following:
    * Email ContentWrapper
*/
export const NewEmail = (props) => {
  const {
    id,
    emailText,
    tipoDeServidor,
    otherRoute,
    port,
    portNumber,
    recentlyCreated,
    password,
  } = props.email;
  const [edit, setEdit] = useState(false);
  const emailState = useSelector(email);
  const dispatch = useDispatch();
  const wrapperRef = useRef(null);
  // for rules modal
  const [openModal, setOpenModal] = useState(false);
  // for delete modal
  const [deleteModal, setDeleteModal] = useState(false);
  // for saving modal
  const [saveModal, setSaveModal] = useState(false);

  // inital rendered info
  const [editedEmail, setEditedEmail] = useState(emailText);
  const [serverType, setServerType] = useState(tipoDeServidor);
  const [isSllOn, setIsSslOn] = useState(port);
  const [puerto, setPuerto] = useState(portNumber);
  const [showOthers, setShowOthers] = useState(
    tipoDeServidor.label === "Otro" ? true : false
  );
  const [serverRoute, setServerRoute] = useState(otherRoute);
  const [editablePassword, setPassword] = useState(password);

  const options = [
    {
      Icon: Lapiz,
      action: () => {
        setEdit(!edit);
      },
      id: 0,
      show: !edit && true,
    },
    {
      Icon: Basura,
      action: () => {
        setDeleteModal(true);
      },
      id: 1,
      show: true,
    },
    {
      Icon: Guardar,
      action: () => {
        setSaveModal(true);
      },
      id: 2,
      show: edit && true,
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
      setServerRoute(e.value.server);
      setPuerto(e.value.port);
    } else {
      setShowOthers(false);
      setPuerto(e.value.port);
      setServerRoute(e.value.server);
    }
  };

  return (
    <EmailContainer edit={edit} ref={wrapperRef}>
      <Modal
        active={deleteModal}
        setModalActive={setDeleteModal}
        height="200px"
      >
        <ContentContainer spaceBetween>
          <h4>
            Esta seguro que quiere eliminar el correo{" "}
            <span
              style={{
                color: "#00B446",
              }}
            >
              {editedEmail !== "" ? editedEmail : `${id}`}
            </span>
            ?
          </h4>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <ModalButtons
              onClick={() => {
                setDeleteModal(false);
              }}
            >
              Cancelar
            </ModalButtons>
            <ModalButtons
              bg="#f1c40f"
              onClick={() => {
                if (id > 60000) {
                  const newEmailList = emailState.emailsList.filter(
                    (item) => item.id !== id
                  );
                  dispatch(editEmailFields(newEmailList));
                } else {
                  dispatch(deleteInbox(id, emailState.emailsList));
                }
                setDeleteModal(false);
              }}
            >
              Eliminar
            </ModalButtons>
          </div>
        </ContentContainer>
      </Modal>
      <Modal active={saveModal} setModalActive={setSaveModal} height="200px">
        <ContentContainer spaceBetween>
          <h4>
            Esta seguro que quiere guargar el correo{" "}
            <span
              style={{
                color: "#00B446",
              }}
            >
              {editedEmail !== "" ? editedEmail : `${id}`}
            </span>
            ?
          </h4>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <ModalButtons
              onClick={() => {
                setSaveModal(false);
              }}
            >
              Cancelar
            </ModalButtons>
            <ModalButtons
              bg="#00B446"
              onClick={() => {
                if (edit && !recentlyCreated) {
                  setServerType({
                    label: serverType.label,
                    value: {
                      ...serverType.value,
                      port: puerto,
                      server: serverRoute,
                    },
                  });
                  let editedInbox = {
                    id: id,
                    emailText: editedEmail,
                    password: editablePassword,
                    otherRoute: serverRoute,
                    portNumber: puerto,
                    tipoDeServidor: serverType,
                  };
                  dispatch(
                    editInbox(
                      editedInbox,
                      emailState.clientSettings.id,
                      emailState.emailsList
                    )
                  );
                  setEdit(false);
                } else if (recentlyCreated) {
                  let newInbox = {
                    clientId: emailState.clientSettings.id,
                    username: editedEmail,
                    password: editablePassword,
                    port: puerto,
                    serverType: serverType,
                    server: serverRoute,
                  };
                  dispatch(
                    createInbox(id, newInbox, emailState.clientSettings.id)
                  );
                  setEdit(false);
                }
                setSaveModal(false);
              }}
            >
              {recentlyCreated ? `Crear` : `Guardar`}
            </ModalButtons>
          </div>
        </ContentContainer>
      </Modal>
      <Modal active={openModal} setModalActive={setOpenModal}>
        <ContentContainer>
          {emailState.loading.loadingRules ? (
            <Loader mTop="250px" />
          ) : (
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
                  del correo{" "}
                  <span
                    style={{
                      color: "#00B446",
                    }}
                  >
                    {editedEmail}
                  </span>{" "}
                </h4>
                <p style={{ fontSize: "14px" }}>
                  visualizando todas tus reglas para el correo dado.
                </p>
                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <Button
                    bg="#00B446"
                    onClick={() => {
                      dispatch(addRuleTempplate(id));
                    }}
                  >
                    Agregar Regla
                  </Button>
                </div>
                <Reglas>
                  {emailState.reglas.map((item, index) => {
                    return <Regla key={index} features={item} inboxId={id} />;
                  })}
                </Reglas>
              </ContentWrapper>
            </Scrollbar>
          )}
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
      <OptionsContainer>
        {options.map((option) => {
          const { Icon, id, action, show } = option;
          return (
            show && (
              <OptionButton key={id} onClick={() => action()}>
                <Icon size={15} />
              </OptionButton>
            )
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
                dispatch(
                  getRulesByInboxId(
                    id,
                    emailState.natures,
                    emailState.areas,
                    emailState.services
                  )
                );
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
                value={editablePassword}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            ) : (
              <InputShow>
                <p>{editablePassword !== "" ? "*******" : ""}</p>
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
