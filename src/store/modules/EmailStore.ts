import { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "../../services/API";
import { TokenService } from "../../services/LocalStorage";
import AWSAPI from "../../services/AWSAPI";

// interface ServerType {
//   label: string;
//   value: object;
// }

interface SelectType {
  label: string;
  value: string;
}

interface ClientSettings {
  id: number;
  apiUrl: string;
  mainUsername: string;
  active: boolean;
  maxInboxLength: number;
}

interface Reglas {
  id: string;
  hasKeywords: string;
  keywords: Array<string>[];
  requestType: string;
  nature: string;
  area: string;
  service: string;
}

interface EmailsListTypes {
  id: number;
  emailText: string;
  tipoDeServidor?: SelectType;
  password?: string;
  port?: boolean;
  portNumber?: number;
  otherRoute?: string;
  recentlyCreated?: boolean;
}

interface EmailState {
  emails: number;
  emailsList: EmailsListTypes[];
  tooManyEmailsAlert: boolean;
  serversList: SelectType[];
  areas: SelectType[];
  natures: SelectType[];
  services: SelectType[];
  clientSettings: ClientSettings;
  reglas: Reglas[];
}

const initialState: EmailState = {
  emails: 0,
  emailsList: [],
  tooManyEmailsAlert: false,
  serversList: [
    { label: "Gmail", value: "GMAIL" },
    { label: "Outlook", value: "OUTLOOK" },
    { label: "Office365", value: "OFFICE365" },
    { label: "Zoho Mail", value: "ZOHO" },
    { label: "Otro", value: "OTRO" },
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
    setAddRules: (state, action: PayloadAction<EmailsListTypes[]>) => {
      state.emailsList = action.payload;
    },
    setClientSettings: (state, action: PayloadAction<ClientSettings>) => {
      state.clientSettings = action.payload;
    },
    setRules: (state, action: PayloadAction<Reglas[]>) => {
      state.reglas = action.payload;
    },
  },
});

/*
This function updates the email count and list:
setEmailsCount => updates the total count of emails
setEmailsList => updates the list of emails by adding a new email
*/
export const addEmailTemplate = () => (dispatch: any) => {
  const newEmailTemplate: EmailsListTypes = {
    id: 60065,
    emailText: "",
    tipoDeServidor: { label: "", value: "" },
    password: "",
    port: false,
    portNumber: undefined,
    otherRoute: "",
    recentlyCreated: true,
  };
  dispatch(setNewInbox(newEmailTemplate));
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
This function deletes an email
*/
// export const DeleteEmail = (Id: string) => (dispatch: any) => {
//   dispatch(setDeleteEmail(Id));
// };

/*
This function adds a rule to an email
*/
// export const addRule =
//   (id: string, emailList: EmailsListTypes[]) => (dispatch: any) => {
//     const indexToModify = emailList.indexOf(
//       emailList.filter((item) => item.id === id)[0]
//     );
//     let emails = [...emailList];
//     const newId = emails[indexToModify].reglas.length + 1;
//     let newRules = [...emails[indexToModify].reglas];
//     newRules = [
//       ...newRules,
//       {
//         id: newId.toString(),
//         hasKeywords: "",
//         keywords: "",
//         requestType: "",
//         nature: "",
//         area: "",
//         service: "",
//       },
//     ];
//     emails[indexToModify] = { ...emails[indexToModify], reglas: newRules };
//     dispatch(setAddRules(emails));
//   };

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
        // console.log(areasToDispatch);
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
This function gets theservice
*/
export const getServices = (areaID?: string) => (dispatch: any) => {
  try {
    API()
      .get(
        `/services/getservices?token=${TokenService.get()}${
          areaID !== "" ? `&areaid=${areaID}` : ``
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
export const getClientSettings =
  (username: string) => async (dispatch: any) => {
    try {
      AWSAPI()
        .post(``, {
          operation: "GetClientSettingsByCliCod",
          payload: {
            cliCod: 1,
          },
        })
        .then((res) => {
          let clientSettings: ClientSettings = {
            id: res.data.data.id,
            apiUrl: res.data.data.apiUrl,
            mainUsername: res.data.data.mainUsername,
            active: res.data.data.active,
            maxInboxLength: res.data.data.maxInboxLength,
          };
          dispatch(setClientSettings(clientSettings));
          // console.log(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

export const getInboxesByClientId =
  (clientID: number) => async (dispatch: any) => {
    try {
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
                value: inbox.serverType,
              },
              password: inbox.password,
              otherRoute: inbox.server,
              port: inbox.port === 993 ? true : false,
              portNumber: inbox.port,
            };
          });
          dispatch(setEmailsList(emailList));
          // console.log(emailList);
        });
    } catch (error) {
      console.log(error);
    }
  };

export const getRulesByInboxId = (inboxID: number) => async (dispatch: any) => {
  try {
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
            requestType: rule.type,
            nature: rule.natureId,
            area: rule.areaId,
            service: rule.serviceId,
          };
        });
        dispatch(setRules(rules));
        // console.log(rules);
      });
  } catch (error) {
    console.log(error);
  }
};

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
          // let logs: Logs[] = [];
          // logs = res.data.data.map((rule: any) => {
          //   return {
          //     id: rule.id,
          //     hasKeywords: rule.hasKeywords,
          //     keywords: rule.keywords,
          //     requestType: rule.type,
          //     nature: rule.natureId,
          //     area: rule.areaId,
          //     service: rule.serviceId,
          //   };
          // });
          // dispatch(setRules(rules));
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

export const createInbox =
  (temporaryInboxId: number, newInbox: any) => async (dispatch: any) => {
    try {
      if (newInbox.username === "" || newInbox.password !== "") {
        AWSAPI()
          .post(``, {
            operation: "CreateInbox",
            payload: newInbox,
          })
          .then((res) => {
            console.log(res.data.data.createdInboxId);
            let replaceObject = {
              ...newInbox,
              id: res.data.data.createdInboxId,
            };
            dispatch(
              setReplaceInbox({
                replaceObject: replaceObject,
                idToReplace: temporaryInboxId,
              })
            );
          });
      } else {
        console.log("Necesitas llenar todos los campos");
      }
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
} = EmailStore.actions;
export const email = (state: RootState) => state.email;
export default EmailStore.reducer;
