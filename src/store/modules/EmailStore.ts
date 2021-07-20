import { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "../../services/API";
import { TokenService } from "../../services/LocalStorage";
import AWSAPI from "../../services/AWSAPI";
import { toast } from "react-toastify";

interface ServerValue {
  text: string;
  server: string;
  port: number;
}

interface ServerType {
  label: string;
  value: ServerValue;
}

interface SelectType {
  label: string;
  value: string;
}

interface LogsType {
  type: string;
  logMessage: string;
  data: string;
  username: string;
}

interface ClientSettings {
  id: number;
  apiUrl: string;
  mainUsername: string;
  active: boolean;
  maxInboxLength: number;
}

interface Reglas {
  id: number;
  hasKeywords: boolean;
  keywords: Array<string>[];
  type?: string;
  ruleId: number;
  natureId?: number;
  areaId?: number;
  serviceId?: number;
  recentlyCreated?: boolean;
}

interface EmailsListTypes {
  id: number;
  emailText: string;
  tipoDeServidor?: ServerType;
  password?: string;
  port?: boolean;
  portNumber?: number;
  otherRoute?: string;
  recentlyCreated?: boolean;
}

interface LoadingTypes {
  loadingRules: boolean;
  loadingInboxes: boolean;
  loadingNatures: boolean;
  loadingAreas: boolean;
}

interface AlertType {
  isOpen: boolean;
  content: string;
}

interface EmailState {
  emails: number;
  emailsList: EmailsListTypes[];
  tooManyEmailsAlert: boolean;
  serversList: ServerType[];
  areas: SelectType[];
  natures: SelectType[];
  services: SelectType[];
  clientSettings: ClientSettings;
  reglas: Reglas[];
  loading: LoadingTypes;
  logs: LogsType[];
  alert: AlertType;
}

const initialState: EmailState = {
  emails: 0,
  emailsList: [],
  tooManyEmailsAlert: false,
  serversList: [
    {
      label: "Gmail",
      value: { text: "GMAIL", server: "imap.gmail.com", port: 993 },
    },
    {
      label: "Outlook",
      value: { text: "OUTLOOK", server: "outlook.office365.com", port: 993 },
    },
    {
      label: "Office365",
      value: { text: "OFFICE365", server: "outlook.office365.com", port: 993 },
    },
    {
      label: "Zoho Mail",
      value: { text: "ZOHO", server: "imappro.zoho.com", port: 993 },
    },
    { label: "Otro", value: { text: "OTRO", server: "", port: 557 } },
  ],
  areas: [],
  natures: [],
  services: [],
  clientSettings: {
    id: 0,
    apiUrl: "",
    mainUsername: "",
    active: false,
    maxInboxLength: 0,
  },
  reglas: [],
  loading: {
    loadingInboxes: false,
    loadingRules: false,
    loadingNatures: false,
    loadingAreas: false,
  },
  logs: [],
  alert: { isOpen: false, content: "" },
};

export const EmailStore = createSlice({
  name: "email",
  initialState,
  reducers: {
    setEmailsCount: (state, action: PayloadAction) => {
      state.emails = state.emails + 1;
    },
    setNewInbox: (state, action: PayloadAction<EmailsListTypes>) => {
      state.emailsList = [...state.emailsList, action.payload];
    },
    setReplaceInbox: (state, action: PayloadAction<any>) => {
      const indexToReplace = state.emailsList.indexOf(
        state.emailsList.filter(
          (item) => item.id === action.payload.idToReplace
        )[0]
      );

      let tempList = [...state.emailsList];
      tempList[indexToReplace] = action.payload.replaceObject;

      state.emailsList = tempList;
    },
    setEmailsList: (state, action: PayloadAction<EmailsListTypes[]>) => {
      state.emailsList = action.payload;
    },
    setTooManyWarning: (state, action: PayloadAction<boolean>) => {
      state.tooManyEmailsAlert = action.payload;
    },
    setEmailFields: (state, action: PayloadAction<EmailsListTypes[]>) => {
      state.emailsList = action.payload;
    },
    setAreas: (state, action: PayloadAction<SelectType[]>) => {
      state.areas = action.payload;
    },
    setNatures: (state, action: PayloadAction<SelectType[]>) => {
      state.natures = action.payload;
    },
    setServices: (state, action: PayloadAction<SelectType[]>) => {
      state.services = action.payload;
    },
    setAddRules: (state, action: PayloadAction<Reglas>) => {
      state.reglas = [...state.reglas, action.payload];
    },
    setClientSettings: (state, action: PayloadAction<ClientSettings>) => {
      state.clientSettings = action.payload;
    },
    setRules: (state, action: PayloadAction<Reglas[]>) => {
      state.reglas = action.payload;
    },
    setRulesLoader: (state, action: PayloadAction<boolean>) => {
      state.loading = { ...state.loading, loadingRules: action.payload };
    },
    setInboxesLoader: (state, action: PayloadAction<boolean>) => {
      state.loading = { ...state.loading, loadingInboxes: action.payload };
    },
    setNaturesLoader: (state, action: PayloadAction<boolean>) => {
      state.loading = { ...state.loading, loadingRules: action.payload };
    },
    setAreasLoader: (state, action: PayloadAction<boolean>) => {
      state.loading = { ...state.loading, loadingInboxes: action.payload };
    },
    setLogs: (state, action: PayloadAction<LogsType[]>) => {
      state.logs = action.payload;
    },
    setNewRule: (state, action: PayloadAction<Reglas[]>) => {
      state.reglas = action.payload;
    },
    setFilteredRules: (state, action: PayloadAction<number>) => {
      state.reglas = state.reglas.filter((item) => item.id !== action.payload);
    },
    setAlert: (state, action: PayloadAction<AlertType>) => {
      state.alert = action.payload;
    },
  },
});

// handles alert changes
export const handleAlert = (payload: AlertType) => (dispatch: any) => {
  dispatch(setAlert(payload));
};
/*
This function updates the email count and list:
setEmailsCount => updates the total count of emails
setEmailsList => updates the list of emails by adding a new email
*/
export const addEmailTemplate = () => (dispatch: any) => {
  const newEmailTemplate: EmailsListTypes = {
    id: 60065,
    emailText: "",
    tipoDeServidor: { label: "", value: { text: "", server: "", port: 557 } },
    password: "",
    port: false,
    portNumber: undefined,
    otherRoute: "",
    recentlyCreated: true,
  };
  dispatch(setNewInbox(newEmailTemplate));
};

export const addRuleTempplate = (id: number) => (dispatch: any) => {
  const newRuleTemplate: Reglas = {
    id: 10000,
    hasKeywords: false,
    keywords: [],
    type: "COMPLETA",
    ruleId: 1,
    recentlyCreated: true,
  };
  dispatch(setAddRules(newRuleTemplate));
};

/*
This function triggers a warning when a user wants to add more emails than limit
*/
export const triggerTooManyWarning = (trigger: boolean) => (dispatch: any) => {
  dispatch(setTooManyWarning(trigger));
};

/*
This function saves the changes done to an email
*/
export const editEmailFields =
  (updatedList: EmailsListTypes[]) => (dispatch: any) => {
    dispatch(setEmailFields(updatedList));
  };

/*
This function gets the natures
*/
export const getNatures = () => (dispatch: any) => {
  try {
    API()
      .get(`/services/getnatures?token=${TokenService.get()}`)
      .then((res) => {
        let naturesToDispatch: SelectType[] = [];
        naturesToDispatch = res.data.Values.map((item: any) => {
          return { label: item.Text, value: item.Value };
        });
        dispatch(setNatures(naturesToDispatch));
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};

/*
This function gets the areaas
*/
export const getAreas = () => (dispatch: any) => {
  try {
    API()
      .get(`/services/getareas?token=${TokenService.get()}`)
      .then((res) => {
        let areasToDispatch: SelectType[] = [];
        areasToDispatch = res.data.Values.map((item: any) => {
          return { label: item.Text, value: item.Value };
        });
        dispatch(setAreas(areasToDispatch));
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};

/*
This function gets the service
*/
export const getServices = (areaID?: string) => (dispatch: any) => {
  try {
    API()
      .get(
        `/services/getservices?token=${TokenService.get()}${
          areaID && areaID !== "" ? `&areaid=${areaID}` : ``
        }`
      )
      .then((res) => {
        let servicesToDispatch: SelectType[] = [];
        servicesToDispatch = res.data.Values.map((item: any) => {
          return { label: item.Text, value: item.Value };
        });
        dispatch(setServices(servicesToDispatch));
      })
      .catch((e) => console.log(e));
  } catch (error) {
    console.log(error);
  }
};

// AWS API CALLS

/*
This function gets Client information which provides key values to make other API calls
*/
export const getClientSettings =
  (username: string, cliCod: any) => async (dispatch: any) => {
    try {
      AWSAPI()
        .post(``, {
          operation: "GetClientSettingsByCliCod",
          payload: {
            cliCod: parseInt(cliCod),
          },
        })
        .then((res) => {
          if (res.status < 400 && res.data.status !== "Fail") {
            let clientSettings: ClientSettings = {
              id: res.data.data.id,
              apiUrl: res.data.data.apiUrl,
              mainUsername: res.data.data.mainUsername,
              active: res.data.data.active,
              maxInboxLength: res.data.data.maxInboxLength,
            };
            dispatch(setClientSettings(clientSettings));
          }
          // console.log(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

/*
This function gets all inboxes created by the user
*/
export const getInboxesByClientId =
  (clientID: number) => async (dispatch: any) => {
    try {
      dispatch(setInboxesLoader(true));
      AWSAPI()
        .post(``, {
          operation: "GetInboxesByClientId",
          payload: {
            clientId: clientID,
          },
        })
        .then((res) => {
          function capitalize(str: string) {
            return str.charAt(0).toUpperCase() + str.slice(1);
          }
          let emailList: EmailsListTypes[] = [];
          emailList = res.data.data.map((inbox: any) => {
            return {
              id: inbox.id,
              emailText: inbox.username,
              tipoDeServidor: {
                label: inbox.serverType
                  .toLowerCase()
                  .split(" ")
                  .map(capitalize)
                  .join(" "),
                value: {
                  text: inbox.serverType,
                  server: inbox.server,
                  port: inbox.port,
                },
              },
              password: inbox.password,
              otherRoute: inbox.server,
              port: inbox.port === 993 ? true : false,
              portNumber: inbox.port,
            };
          });
          dispatch(setEmailsList(emailList));
          dispatch(setInboxesLoader(false));
          // console.log(emailList);
        });
    } catch (error) {
      console.log(error);
      dispatch(setInboxesLoader(false));
    }
  };

/*
This function gets all of the rules for a specific inbox
*/
export const getRulesByInboxId =
  (
    inboxID: number,
    natures: SelectType[],
    areas: SelectType[],
    services: SelectType[]
  ) =>
  async (dispatch: any) => {
    try {
      dispatch(setRulesLoader(true));
      AWSAPI()
        .post(``, {
          operation: "GetRulesByInboxId",
          payload: {
            inboxId: inboxID,
          },
        })
        .then((res) => {
          let rules: Reglas[] = [];
          rules = res.data.data.map((rule: any) => {
            return {
              id: rule.id,
              hasKeywords: rule.hasKeywords,
              keywords: rule.keywords,
              type: rule.type,
              ruleId: rule.ruleId,
              areaId: rule.areaId,
              serviceId: rule.serviceId,
              natureId: rule.natureId,
            };
          });

          dispatch(setRules(rules));
          dispatch(setRulesLoader(false));
          //   console.log(rules);
        });
    } catch (error) {
      console.log(error);
      dispatch(setRulesLoader(false));
    }
  };

/*
This function gets all of the logs created by the user
*/
export const getLogsByClientId =
  (clientId?: number) => async (dispatch: any) => {
    try {
      AWSAPI()
        .post(``, {
          operation: "GetLogsByClientId",
          payload: {
            clientId: 1,
          },
        })
        .then((res) => {
          let logs: LogsType[] = res.data.data.Items.map((log: any) => {
            return {
              type: log.type,
              logMessage: log.logMessage,
              date: log.date,
              username: log.inboxUsername,
            };
          });
          //   console.log(logs);
          dispatch(setLogs(logs));
        });
    } catch (error) {
      console.log(error);
    }
  };

/*
This function creates a new inbox by first being validated by imap
*/
export const createInbox =
  (temporaryInboxId: number, newInbox: any, clientID: number) =>
  async (dispatch: any) => {
    try {
      const validation = await AWSAPI()
        .post(``, {
          operation: "ValidateIMAPCredentials",
          payload: {
            username: newInbox.username,
            password: newInbox.password,
            server: newInbox.server,
            port: newInbox.port,
          },
        })
        .then((res) => {
          //   console.log(res.data);
          return res.data.data.successfulConnection;
          //   return true;
        });
      //   console.log(validation.data.successfulConnection);
      if (validation === true) {
        AWSAPI()
          .post(``, {
            operation: "CreateInbox",
            payload: {
              clientId: clientID,
              username: newInbox.username,
              password: newInbox.password,
              server: newInbox.server,
              port: newInbox.port ? 993 : 557,
              serverType: newInbox.serverType.value.text,
            },
          })
          .then((res) => {
            console.log(res.data.data.createdInboxId);
            let replaceObject = {
              id: res.data.data.createdInboxId,
              emailText: newInbox.username,
              password: newInbox.password,
              port: newInbox.port,
              portNumber: newInbox.port ? 993 : 557,
              tipoDeServidor: newInbox.serverType,
              otherRoute: newInbox.server,
            };
            dispatch(
              setReplaceInbox({
                replaceObject: replaceObject,
                idToReplace: temporaryInboxId,
              })
            );
            toast.success("Buzón creado exitosamente.", {
              bodyStyle: { color: "white" },
              position: "bottom-left",
            });
          });
      } else {
        dispatch(
          setAlert({
            isOpen: true,
            content:
              "Credenciales imap incorrectas. Prueba con otros credenciales",
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

/*
This function deletes an inbox from the database
*/
export const deleteInbox =
  (inboxId: number, emails: EmailsListTypes[]) => async (dispatch: any) => {
    try {
      AWSAPI()
        .post(``, {
          operation: "DeleteInbox",
          payload: {
            inboxId: inboxId,
          },
        })
        .then((res) => {
          const newEmailList = emails.filter((item) => item.id !== inboxId);
          if (res.data.data.deleted) {
            dispatch(setEmailsList(newEmailList));
          }
          toast.warning("Buzón eliminado exitosamente.", {
            bodyStyle: { color: "white" },
            position: "bottom-left",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

/*
This function edits an inbox
*/
export const editInbox =
  (emailToEdit: EmailsListTypes, clientId: number, emails: EmailsListTypes[]) =>
  async (dispatch: any) => {
    try {
      AWSAPI()
        .post(``, {
          operation: "EditInbox",
          payload: {
            id: emailToEdit.id,
            clientId: clientId,
            username: emailToEdit.emailText,
            password: emailToEdit.password,
            server: emailToEdit.otherRoute,
            port: emailToEdit.portNumber,
            serverType: emailToEdit.tipoDeServidor?.value.text,
          },
        })
        .then((res) => {
          if (res.data.data.edited === true) {
            dispatch(
              setReplaceInbox({
                replaceObject: emailToEdit,
                idToReplace: emailToEdit.id,
              })
            );
            toast.success("Buzón guardado exitosamente.", {
              bodyStyle: { color: "white" },
              position: "bottom-left",
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

export const saveRule =
  (payloadArg: any, recentlyCreated: boolean, rules: Reglas[]) =>
  (dispatch: any) => {
    if (recentlyCreated) {
      try {
        AWSAPI()
          .post(``, {
            operation: "CreateInboxRule",
            payload: { ...payloadArg },
          })
          .then((res) => {
            let ruleToReplace = {
              id: res.data.data.createdInboxRuleId,
              hasKeywords: payloadArg.hasKeywords,
              keywords: payloadArg.keywords,
              type: payloadArg.type,
              natureId: payloadArg.natureId,
              areaId: payloadArg.areaId,
              serviceId: payloadArg.serviceId,
              ruleId: payloadArg.ruleId,
            };

            const indexToReplace = rules.indexOf(
              rules.filter((item) => item.id === payloadArg.id)[0]
            );

            let tempList = [...rules];
            tempList[indexToReplace] = ruleToReplace;

            dispatch(setNewRule(tempList));

            // console.log(tempList);
            toast.success("Regla creada con exito.", {
              bodyStyle: { color: "white" },
              position: "bottom-left",
            });
          });
      } catch (error) {
        console.log(error);
      }
    } else if (!recentlyCreated) {
      try {
        AWSAPI()
          .post(``, {
            operation: "EditInboxRule",
            payload: { ...payloadArg },
          })
          .then((res) => {
            if (res.data.data.edited) {
              let ruleToReplace = {
                id: payloadArg.id,
                hasKeywords: payloadArg.hasKeywords,
                keywords: payloadArg.keywords,
                type: payloadArg.type,
                natureId: payloadArg.natureId,
                areaId: payloadArg.areaId,
                serviceId: payloadArg.serviceId,
                ruleId: payloadArg.ruleId,
              };

              const indexToReplace = rules.indexOf(
                rules.filter((item) => item.id === payloadArg.id)[0]
              );

              let tempList = [...rules];
              tempList[indexToReplace] = ruleToReplace;

              dispatch(setNewRule(tempList));
              toast.success("Regla guardada con exito.", {
                bodyStyle: { color: "white" },
                position: "bottom-left",
              });
            } else {
              console.log(res.data);
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

export const deleteRule = (ruleId: number) => (dispatch: any) => {
  try {
    AWSAPI()
      .post(``, {
        operation: "DeleteInboxRule",
        payload: { inboxRuleId: ruleId },
      })
      .then((res) => {
        if (res.data.data.deleted) {
          dispatch(setFilteredRules(ruleId));
          toast.warning("Regla eliminada con exito.", {
            bodyStyle: { color: "white" },
            position: "bottom-left",
          });
        }
        // console.log(res.data);
      });
  } catch (error) {
    console.log(error);
  }
};

export const {
  setEmailsCount,
  setEmailsList,
  setNewInbox,
  setReplaceInbox,
  setTooManyWarning,
  setEmailFields,
  setRules,
  //   setDeleteEmail,
  setAreas,
  setNatures,
  setServices,
  setAddRules,
  setClientSettings,
  setRulesLoader,
  setInboxesLoader,
  setNaturesLoader,
  setAreasLoader,
  setLogs,
  setNewRule,
  setFilteredRules,
  setAlert,
} = EmailStore.actions;
export const email = (state: RootState) => state.email;
export default EmailStore.reducer;
