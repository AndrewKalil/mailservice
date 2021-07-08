import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "../../services/API";
import { TokenService } from "../../services/LocalStorage";
import { RootState } from "../store";
// import { getCIs } from "./CIStore";
import { getAssetsByRequest, getFilesByRequest } from "./RequestStore";

interface Rule {
  ruleID: string;
  ruleName: string;
}

interface RuleState {
  list: Rule[];
  requestID: string;
  mode: number; // 0: Mostrar relgas, 1: se encontra una regla y se creo la solicitud, 2: listado de reglas, 3:No se encontraron reglas
}

const initialState: RuleState = {
  list: [],
  requestID: "",
  mode: 0,
};

export const RuleStore = createSlice({
  name: "Rule",
  initialState,
  reducers: {
    setRule: (state, action: PayloadAction<Rule[]>) => {
      // state = action.payload
      // return [...state.list, ...action.payload.list]
      state.list = action.payload;
    },
    clearRules: (state) => {
      state.list = [];
    },
    setRequestID: (state, action: PayloadAction<string>) => {
      state.requestID = action.payload;
    },
    setMode: (state, action: PayloadAction<number>) => {
      state.mode = action.payload;
    },
  },
});

export const getRules =
  (
    subject: string,
    description: string,
    username: string,
    by: string,
    companyid: string,
    selectedUserComapnyid: string,
    ci: string,
    files?: any,
    email?: string,
    telefono?: string,
    extension?: string,
    locationSelected?: string,
    departmentSelected?: string
  ) =>
  async (dispatch: any) => {
    try {
      API()
        .post(`Rules/getRule`, {
          token: TokenService.get(),
          OnBehalfTo: by,
          Description: description,
          Subject: subject,
          ThroughOf: 1,
          email: email,
          telefono: telefono,
          extension: extension,
          locationSelected: locationSelected,
          departmentSelected: departmentSelected,
        })
        .then((response) => {
          const data: Rule[] = [];

          if (response.data.Values.Values === "[]") {
            // SE CREO
            dispatch(setMode(1));
            console.log("se encontra una regla y se creo la solicitud");
            if (by === username || companyid === selectedUserComapnyid)
              dispatch(setRequestID(response.data.Values.RequestID));
            else dispatch(setRequestID("-1"));
            if (ci) {
              if (ci !== "none")
                dispatch(associateCI(ci, response.data.Values.RequestID));
            }
            if (files) {
              files.map((file: File) => {
                dispatch(uploadFile(response.data.Values.RequestID, file));
                return null;
              });
            }
          } else if (response.data.Values.Values.length > 0) {
            // PARA ESCOGER
            dispatch(setMode(2));
            console.log("listado de reglas");

            response.data.Values.Values.forEach((RuleItem: any) => {
              data.push({
                ruleID: RuleItem.ReglaID,
                ruleName: RuleItem.ReglaNom,
              });
            });
          } else {
            // CRREAR CON METODO 2
            dispatch(setMode(3));
            console.log("No se encontraron reglas");
          }
          dispatch(setRule(data));
        });
    } catch (e) {
      return console.error(e.message);
    }
  };

export const sendRuleRequest =
  (
    subject: string,
    description: string,
    ruleID: string,
    username: string,
    by: string,
    companyid: string,
    selectedUserComapnyid: string,
    ci?: string,
    files?: any,
    email?: string,
    telefono?: string,
    extension?: string,
    locationSelected?: string,
    departmentSelected?: string
  ) =>
  async (dispatch: any) => {
    try {
      API()
        .post(`Rules/getRule`, {
          token: TokenService.get(),
          OnBehalfTo: by,
          Description: description,
          Subject: subject,
          ThroughOf: 1,
          ReglaID: ruleID,
          email: email,
          telefono: telefono,
          extension: extension,
          locationSelected: locationSelected,
          departmentSelected: departmentSelected,
        })
        .then((response) => {
          if (by === username || companyid === selectedUserComapnyid)
            dispatch(setRequestID(response.data.Values.RequestID));
          else dispatch(setRequestID("-1"));
          if (ci) {
            if (ci !== "none")
              dispatch(associateCI(ci, response.data.Values.RequestID));
          }

          if (files) {
            files.map((file: File) => {
              dispatch(uploadFile(response.data.Values.RequestID, file));
              return null;
            });
          }
        });
    } catch (e) {
      return console.error(e.message);
    }
  };

export const createSimpleRequest =
  (
    subject: string,
    description: string,
    username: string,
    by: string,
    companyid: string,
    selectedUserComapnyid: string,
    serviceID: string,
    ci?: string,
    files?: any,
    email?: string,
    telefono?: string,
    extension?: string,
    locationSelected?: string,
    departmentSelected?: string
  ) =>
  async (dispatch: any) => {
    try {
      API()
        .post(`services/createrequest`, {
          token: TokenService.get(),
          OnBehalfTo: by,
          Description: description,
          Subject: subject,
          Nature: 4,
          ServiceID: serviceID,
          ThroughOf: 1,
          email: email,
          telefono: telefono,
          extension: extension,
          locationSelected: locationSelected,
          departmentSelected: departmentSelected,
        })
        .then((response) => {
          if (by === username)
            dispatch(setRequestID(response.data.Values.RequestID));
          else if (by !== username) {
            dispatch(setRequestID(""));
          } else dispatch(setRequestID("-1"));
          //   dispatch(setRequestID(response.data.Values.RequestID));

          if (ci) {
            if (ci !== "none")
              dispatch(associateCI(ci, response.data.Values.RequestID));
          }

          if (files) {
            files.map((file: File) => {
              dispatch(uploadFile(response.data.Values.RequestID, file));
              return null;
            });
          }
        });
    } catch (e) {
      return console.error(e.message);
    }
  };

export const associateCI =
  (ci: string, requestID: string) => async (dispatch: any) => {
    try {
      API()
        .post(`assets/AssociateCIToRequest`, {
          token: TokenService.get(),
          requestID: requestID,
          ciList: [
            {
              CIID: ci,
              CIName: "",
              Impact: "",
            },
          ],
        })
        .then((response) => {
          console.log("Status:", response.data.Status);
          dispatch(getAssetsByRequest(requestID));
        });
    } catch (e) {
      return console.error(e.message);
    }
  };

export const removeCI =
  (ci: string, requestID: string) => async (dispatch: any) => {
    try {
      API()
        .post(`assets/RemoveCIFromRequest`, {
          token: TokenService.get(),
          requestID: requestID,
          ciID: ci,
        })
        .then((response) => {
          console.log("Status:", response.data.Status);
          dispatch(getAssetsByRequest(requestID));
        });
    } catch (e) {
      return console.error(e.message);
    }
  };

export const uploadFile =
  (requestID: string, file: File) => async (dispatch: any) => {
    var bodyFormData = new FormData();
    bodyFormData.append("files", file);
    return await API()
      .post(`File/PostFile`, bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        dispatch(appendFile(requestID, file, response.data.guid));
      })
      .catch((e) => {
        return console.error(e.message);
      });
  };

export const appendFile =
  (requestID: string, file: File, guid: string) => async (dispatch: any) => {
    try {
      API()
        .post(`File/UploadFileServiceRequestAsync`, {
          token: TokenService.get(),
          RequestID: requestID,
          files: [
            {
              fileName: file.name,
              mimeType: file.type,
              fileCreatedTime: new Date(),
              fileLength: file.size,
              guid: guid,
            },
          ],
        })
        .then((response) => {
          console.log("File Status:", response.data);
          dispatch(getFilesByRequest(requestID));
        });
    } catch (e) {
      return console.error(e.message);
    }
  };

export const removeFile =
  (attachmentID: string, requestID: string) => async (dispatch: any) => {
    try {
      API()
        .post(`file/DeleteAttachment`, {
          attachmentID: attachmentID,
          token: TokenService.get(),
        })
        .then((response) => {
          console.log("Status:", response.data.Status);
          dispatch(getFilesByRequest(requestID));
        });
    } catch (e) {
      return console.error(e.message);
    }
  };

export const setRules = () => async (dispatch: any) => {
  dispatch(clearRules());
};

export const { setRule, clearRules, setRequestID, setMode } = RuleStore.actions;
export const rule = (state: RootState) => state.rule;
export default RuleStore.reducer;
