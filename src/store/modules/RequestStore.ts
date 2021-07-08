import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "../../services/API";
import { TokenService } from "../../services/LocalStorage";
import { RootState } from "../store";
import { setRequestID } from "./RuleStore";

export interface ISelect {
  value: string;
  label: string;
}

interface Asset {
  CIID: string;
  CIName: string;
  Department: string;
  Impact: string;
  Location: string;
  UsedBy: string;
}

export interface AutofillDataType {
  UserLocationText?: string;
  UserLocationValue?: string;
  UserMail?: string;
  UserTelephone?: string;
  UserExtension?: string;
  UserDepartmentText?: string;
  UserDepartmentValue?: string;
}

interface Users {
  AuthUserID: string;
  CardID: string;
  Cellphone: string;
  CityID: string;
  CityName: string;
  CompanyID: string;
  CompanyName: string;
  CostCenterID: string;
  CostCenterName: string;
  CountryID: string;
  CountryName: string;
  DepartmentID: string;
  DepartmentName: string;
  DynamicSQL: string;
  Email: string;
  Extention: string;
  ExternalUser: string;
  Gender: string;
  HourCost: string;
  HoursMonth: string;
  IsSuperUser: string;
  IsVIP: string;
  LastName: string;
  LevelID: string;
  LocationID: string;
  LocationName: string;
  Name: string;
  Office: string;
  Phone: string;
  Phone2: string;
  PicturePath: string;
  PositionID: string;
  PositionName: string;
  StateID: string;
  StateName: string;
  StatusID: string;
  StatusName: string;
  TimeID: string;
  UpdatedOn: string;
  Username: string;
}

interface WorkOrder {
  ID?: string;
  ServiceOrderID?: string;
  Description?: string;
  Percentage?: string;
  TechnicianID?: string;
  StatusID?: string;
  StatusDescription?: string;
  TechnicianName?: string;
  TechnicianIsVIP?: string;
  IsPredecessor?: string;
  UserImage?: string;
  Advances: OrderAdvancement[];
}

export interface Request {
  requestId?: string;
  statusName?: string;
  closeDate?: string;
  creationDate?: string;
  description?: string;
  equipmentName?: string;
  errorTypeID?: string;
  errorTypeName?: string;
  expirationDate?: string;
  filingDate?: string;
  majorIncident?: string;
  natureCod?: string;
  natureID?: string;
  natureName?: string;
  onBehalfOfID?: string;
  onBehalfOfName?: string;
  priorityID?: string;
  problemTypeID?: string;
  problemTypeName?: string;
  receivedByID?: string;
  receivedByNames?: string;
  receptionDate?: string;
  reopenDate?: string;
  requestID: string;
  requestUserID?: string;
  requestUserNames?: string;
  statusID?: string;
  subject: string;
  surveyStatus?: string;
  vipStatus?: string;
  viaID?: string;
  viaName?: string;
  TechnicianName?: string;
  TechnicianImg?: any;
}

interface FullRequest {
  RequestID?: string;
  RequestUserID?: string;
  RequestUserNames?: string;
  RequestUserIsVIP?: string;
  ReceivedByID?: string;
  ReceivedByNames?: string;
  ReceivedByIsVIP?: string;
  ObBehalfOfID?: string;
  OnBehalfOfName?: string;
  ObBehalfOfEmail?: string;
  ObBehalfOfIsVIP?: string;
  CreationDate?: string;
  Description?: string;
  PriorityID?: string;
  StatusID?: string;
  StatusName?: string;
  Subject?: string;
  EquipmentName?: string;
  CloseDate?: string;
  ExpirationDate?: string;
  SurveyStatus?: string;
  FilingDate?: string;
  NatureID?: string;
  NatureName?: string;
  MajorIncident?: string;
  ReceptionDate?: string;
  ReopenDate?: string;
  VIPStatus?: string;
  NatureCod?: string;
  ViaID?: string;
  ViaName?: string;
  ProblemTypeID?: string;
  ProblemTypeName?: string;
  ErrorTypeID?: string;
  ErrorTypeName?: string;
  NatureTypeID?: string;
  NatureTypeName?: string;
  SLACode?: string;
  SLAName?: string;
  ObBehalfOfURLImage?: string;
  ServiceOrder?: ServiceOrder;
}

interface ServiceOrder {
  ActivityID?: string;
  ActivityName?: string;
  AreaID?: string;
  AreaName?: string;
  AssignmentDate?: string;
  CanBeReopened?: string;
  CategoryID?: string;
  CategoryName?: string;
  CloseDate?: string;
  Description?: string;
  ID?: string;
  ImpactID?: string;
  IsAccessFull?: string;
  PriorityID?: string;
  RFCID?: string;
  ServiceID?: string;
  ServiceName?: string;
  StatusID?: string;
  StatusName?: string;
  SurveyStatus?: string;
  TechnicianID?: string;
  TechnicianName?: string;
  UrgencyID?: string;
  WorkGroupID?: string;
  WorkGroupName?: string;
}

interface OrderAdvancement {
  AdvancementID: string;
  Description: string;
  EndDate: string;
  Environment: string;
  Progress: string;
  StartDate: string;
  Via: string;
  WorkOrderID: string;
}

interface Note {
  Description: string;
  ID: string;
  NoteDate: string;
  NoteTypeID: string;
  NoteTypeName: string;
  RequestID: string;
  UserID: string;
  UserImage: string;
  UserIsVIP: string;
  UserName: string;
}

interface FileAttach {
  AttachmentID: string;
  AttachmentPath: string;
  FileName: string;
  FileSize: string;
  FileURL: string;
}

interface RequestState {
  list: Request[];
  active: FullRequest;
  filteredList: Request[];
  pageData: Request[];
  workOrders: WorkOrder[];
  term: string;
  selectedYears: number[];
  selectedStatuses: number[];
  advancements: OrderAdvancement[];
  users: Users[];
  filteredUsers: ISelect[];
  createSuccess: boolean;
  areas: ISelect[];
  departments: ISelect[];
  locations: ISelect[];
  services: ISelect[];
  assets: Asset[];
  pagesTotal: number;
  offset: number;
  statuses: ISelect[];
  years: ISelect[];
  notesTypes: ISelect[];
  notes: Note[];
  page: number;
  files: FileAttach[];
  autofillData: AutofillDataType;
  workOrderId: string;
}

const initialState: RequestState = {
  list: [],
  active: {},
  filteredList: [],
  term: "",
  advancements: [],
  workOrders: [],
  filteredUsers: [],
  users: [],
  createSuccess: false,
  areas: [],
  departments: [],
  locations: [],
  services: [],
  assets: [],
  pageData: [],
  pagesTotal: 0,
  offset: 0,
  statuses: [],
  years: [],
  notesTypes: [],
  notes: [],
  selectedYears: [],
  selectedStatuses: [],
  page: 0,
  files: [],
  autofillData: {},
  workOrderId: "",
};

export const RequestStore = createSlice({
  name: "request",
  initialState,
  reducers: {
    setRequests: (state, action: PayloadAction<Request[]>) => {
      state.list = action.payload.reverse();
    },
    setWorkOrders: (state, action: PayloadAction<WorkOrder[]>) => {
      state.workOrders = action.payload;
    },
    setActiveRequest: (state, action: PayloadAction<FullRequest>) => {
      state.active = action.payload;
    },
    setFilteredRequests: (state) => {
      const listFiltered = state.list.filter((e) => {
        return e.subject.toLowerCase().indexOf(state.term.toLowerCase()) !== -1;
      });
      state.filteredList = listFiltered;
    },
    setCurrentPageData: (state, action: PayloadAction<number>) => {
      const newData = state.list.slice(action.payload, action.payload + 10);
      state.pageData = newData;
    },
    setTerm: (state, action: PayloadAction<string>) => {
      state.term = action.payload;
    },
    setSelectedYears: (state, action: PayloadAction<number[]>) => {
      state.selectedYears = action.payload;
    },
    setSelectedStatuses: (state, action: PayloadAction<number[]>) => {
      state.selectedStatuses = action.payload;
    },
    setAdvancements: (state, action: PayloadAction<OrderAdvancement[]>) => {
      state.advancements = action.payload;
    },
    setFilteredUsers: (state, action: PayloadAction<ISelect[]>) => {
      state.filteredUsers = action.payload;
    },
    setUsers: (state, action: PayloadAction<Users[]>) => {
      state.users = action.payload;
    },
    createSuccess: (state, action: PayloadAction<boolean>) => {
      state.createSuccess = action.payload;
    },
    setAreas: (state, action: PayloadAction<ISelect[]>) => {
      state.areas = action.payload;
    },
    setDepartments: (state, action: PayloadAction<ISelect[]>) => {
      state.departments = action.payload;
    },
    setLocations: (state, action: PayloadAction<ISelect[]>) => {
      state.locations = action.payload;
    },
    setServices: (state, action: PayloadAction<ISelect[]>) => {
      state.services = action.payload;
    },
    setAssets: (state, action: PayloadAction<Asset[]>) => {
      state.assets = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.pagesTotal = action.payload;
    },
    setStatuses: (state, action: PayloadAction<ISelect[]>) => {
      state.statuses = action.payload;
    },
    setYears: (state, action: PayloadAction<ISelect[]>) => {
      state.years = action.payload;
    },
    setNotesTypes: (state, action: PayloadAction<ISelect[]>) => {
      state.notesTypes = action.payload;
    },
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setFiles: (state, action: PayloadAction<FileAttach[]>) => {
      state.files = action.payload;
    },
    setAutofillData: (state, action: PayloadAction<AutofillDataType>) => {
      state.autofillData = action.payload;
    },
    setWorkOrderId: (state, action: PayloadAction<string>) => {
      state.workOrderId = action.payload;
    },
    // setRequestID: (state, action: PayloadAction) => {

    // }
  },
});

export const setAutofillRequestData = () => async (dispatch: any) => {
  try {
    API()
      .get(`users/GetUserBasicInformation?token=${TokenService.get()}`)
      .then((response) => {
        let autofillData: AutofillDataType = {};
        autofillData["UserLocationText"] = response.data.Value.UserLocationText;
        autofillData["UserLocationValue"] =
          response.data.Value.UserLocationValue;
        autofillData["UserMail"] = response.data.Value.UserMail;
        autofillData["UserTelephone"] = response.data.Value.UserTelephone;
        autofillData["UserExtension"] = response.data.Value.UserExtension;
        autofillData["UserDepartmentText"] =
          response.data.Value.UserDepartmentText;
        autofillData["UserDepartmentValue"] =
          response.data.Value.UserDepartmentValue;
        dispatch(setAutofillData(autofillData));
      });
  } catch (e) {
    return console.error(e.message);
  }
};

export const getAreas = (username: string) => async (dispatch: any) => {
  try {
    API()
      .get(`services/getareas?token=${TokenService.get()}&username=${username}`)
      .then((response) => {
        let areas: ISelect[] = [];
        response.data.Values.forEach((e: any) => {
          areas.push({ value: e.Value, label: e.Text });
        });
        dispatch(setAreas(areas));
      });
  } catch (e) {
    return console.error(e.message);
  }
};

export const rateRequest =
  (
    RequestCode: number,
    isUseful: boolean,
    hasComplaint: boolean,
    observations: string
  ) =>
  async () => {
    return await API()
      .post(`knowledge/RateSurvey`, {
        RequestCode: RequestCode,
        isUseful: isUseful,
        hasComplaint: hasComplaint,
        observations: observations,
        token: TokenService.get(),
      })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

export const getServices =
  (username: string, areaId: string) => async (dispatch: any) => {
    try {
      API()
        .get(
          `services/getservices?token=${TokenService.get()}&areaid=${areaId}&username=${username}`
        )
        .then((response) => {
          let areas: ISelect[] = [];
          response.data.Values.forEach((e: any) => {
            areas.push({ value: e.Value, label: e.Text });
          });
          dispatch(setServices(areas));
        });
    } catch (e) {
      return console.error(e.message);
    }
  };

export const getStatuses = () => async (dispatch: any) => {
  try {
    API()
      .get(`services/GetServiceOrderStatus?token=${TokenService.get()}`)
      .then((response) => {
        let areas: ISelect[] = [];
        response.data.Values.forEach((e: any) => {
          areas.push({ value: e.Value, label: e.Text });
        });
        dispatch(setStatuses(areas));
      });
  } catch (e) {
    return console.error(e.message);
  }
};

export const getNoteTypes = () => async (dispatch: any) => {
  try {
    API()
      .get(`services/getnotetypes?token=${TokenService.get()}`)
      .then((response) => {
        let areas: ISelect[] = [];
        response.data.Values.forEach((e: any) => {
          areas.push({ value: e.Value, label: e.Text });
        });
        dispatch(setNotesTypes(areas));
      });
  } catch (e) {
    return console.error(e.message);
  }
};

export const getYears = (username: string) => async (dispatch: any) => {
  try {
    API()
      .get(
        `services/GetRequests?token=${TokenService.get()}&userSearched=${username}`
      )
      .then((response) => {
        const dates: number[] = [];
        response.data.Values.forEach((requestItem: any) => {
          const date = new Date(requestItem.ReceptionDate);
          dates.push(date.getFullYear());
        });
        let result = dates.filter((item, index) => {
          return dates.indexOf(item) === index;
        });
        const datesSelect: ISelect[] = [];
        result.sort().forEach((e) => {
          datesSelect.push({ value: e.toString(), label: e.toString() });
        });
        dispatch(setYears(datesSelect));
      });
  } catch (e) {
    return console.error(e.message);
  }
};

export const getWorkerOrderID = async (RequestID: string) => {
  return API()
    .get(
      `services/getrequestwithorder?token=${TokenService.get()}&requestid=${RequestID}`
    )
    .then((response) => {
      return response.data.Values.ServiceOrder.ID;
    })
    .catch((e) => {
      return e;
    });
};

export const getWorker = async (RequestID: string) => {
  const workOderID = await getWorkerOrderID(RequestID);
  return await API()
    .get(
      `services/getworkorders?token=${TokenService.get()}&serviceorderid=${workOderID}`
    )
    .then((res) => {
      return res.data.Values.length > 0 ? res.data.Values[0].UserImage : "";
    })
    .catch((e) => {
      return e;
    });
  //   try {
  //     API()
  //       .get(
  //         `services/getworkorders?token=${TokenService.get()}&serviceorderid=${workOderID}`
  //       )
  //       .then((response) => {
  //         // console.log(
  //         //   typeof (response.data.Values.length > 0
  //         //     ? response.data.Values[0].UserImage
  //         //     : "")
  //         // );
  //         return response.data;
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
};

export const getRequests =
  (username: string, page?: number) => async (dispatch: any) => {
    try {
      await API()
        .get(
          `services/GetRequests?token=${TokenService.get()}&year=2021&serviceOrderStatusID=1,4,3&userSearched=${username}`
        )
        .then(async (response) => {
          let data: Request[] = [];

          data = await Promise.all(
            response.data.Values.map(async (requestItem: any) => {
              //   const image = await getWorker(requestItem.RequestID);
              //   console.log(image);
              let newItem = {
                requestID: requestItem.RequestID,
                subject: requestItem.Subject,
                statusName: requestItem.StatusName,
                receptionDate: requestItem.ReceptionDate,
                viaName: requestItem.ViaName,
                TechnicianName: requestItem.TechnicianName,
                TechnicianImg: await getWorker(requestItem.RequestID),
              };
              return newItem;
            })
          );

          dispatch(setRequests(data));
          dispatch(setRequestID(""));
          let offset = 0;
          if (page) offset = page;
          dispatch(setTotalPages(data.length));
          dispatch(setCurrentPageData(offset));
          console.log(data);
        });
    } catch (e) {
      return console.error(e.message);
    }
  };

export const getActiveRequest =
  (requestId: string) => async (dispatch: any) => {
    try {
      API()
        .get(
          `services/getrequestwithorder?token=${TokenService.get()}&requestid=${requestId}`
        )
        .then((response) => {
          dispatch(setActiveRequest(response.data.Values));
          dispatch(getOrdersWorks(response.data.Values.ServiceOrder.ID));
          dispatch(getFilesByRequest(requestId));
          dispatch(getAssetsByRequest(requestId));
          dispatch(getNoteTypes());
          dispatch(getNotesByRequest(requestId));
          dispatch(setRequestID(""));
          console.log(response);
        });
      return;
    } catch (e) {
      return console.error(e.message);
    }
  };

export const getOrdersWorks = (serviceID: number) => async (dispatch: any) => {
  return await API()
    .get(
      `services/getworkorders?token=${TokenService.get()}&serviceorderid=${serviceID}`
    )
    .then(async (response) => {
      let workOrders: any[] = [];
      for (const element of response.data.Values) {
        const workOrder: WorkOrder = { ...element, Advances: [] };
        const workOderID = workOrder.ID;
        const advances = await getOrderAdvancementsWork(
          workOderID ? workOderID : "0"
        );
        workOrder.Advances = advances;
        workOrders.push(workOrder);
      }

      dispatch(setWorkOrders(workOrders));
    })
    .catch((e) => {
      return console.error(e.message);
    });
};

export const getOrderAdvancementsWork = async (workOrderId: string) => {
  return API()
    .get(
      `services/getworkorderadvancements?token=${TokenService.get()}&workorderid=${workOrderId}`
    )
    .then((response) => {
      return response.data.Values;
    });
};

export const getAssetsByRequest =
  (requestId: string) => async (dispatch: any) => {
    try {
      API()
        .get(
          `assets/GetAssetsByRequest?token=${TokenService.get()}&requestid=${requestId}`
        )
        .then((response) => {
          dispatch(setAssets(response.data.Values));
          // dispatch(getFilesByRequest(requestId));
        });
    } catch (e) {
      return console.error(e.message);
    }
  };

export const getFilesByRequest =
  (requestId: string) => async (dispatch: any) => {
    try {
      API()
        .get(
          `file/GetAttachmentsListRequest?token=${TokenService.get()}&requestid=${requestId}`
        )
        .then((response) => {
          dispatch(setFiles(response.data.Values));
        });
    } catch (e) {
      return console.error(e.message);
    }
  };

export const getNotesByRequest =
  (requestId: string) => async (dispatch: any) => {
    return await API()
      .get(
        `services/getnotes?token=${TokenService.get()}&RequestID=${requestId}`
      )
      .then((response) => {
        dispatch(setNotes(response.data.Values));
      });
  };

export const setCurrentData = (offset: number) => async (dispatch: any) => {
  dispatch(setCurrentPageData(offset));
};

export const createNote =
  (requestID: string, text: string, noteType: string) =>
  async (dispatch: any) => {
    return await API()
      .post(`services/insertnote`, {
        Token: TokenService.get(),
        RequestID: requestID,
        Description: text,
        NoteTypeID: noteType,
      })
      .then((response) => {
        dispatch(getNotesByRequest(requestID));
      })
      .catch((e) => {
        return console.error(e.message);
      });
  };

export const getFilteredRequests =
  (username: string, status: number[], years: number[], page?: number) =>
  async (dispatch: any) => {
    var today = new Date();
    // var dd = String(today.getDate()).padStart(2, "0");
    // var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    let filter = "";
    if (status.length > 0) filter = `&serviceOrderStatusID=${status}`;
    let filterYear = "";
    if (years.length > 0) filter = `&year=${years}`;
    else filter = `&year=${yyyy}`;
    try {
      API()
        .get(
          `services/GetRequests?token=${TokenService.get()}${filterYear}${filter}&userSearched=${username}`
        )
        .then(async (response) => {
          let data: Request[] = [];
          data = await Promise.all(
            response.data.Values.map(async (requestItem: any) => {
              //   const image = await getWorker(requestItem.RequestID);
              //   console.log(image);
              let newItem = {
                requestID: requestItem.RequestID,
                subject: requestItem.Subject,
                statusName: requestItem.StatusName,
                receptionDate: requestItem.ReceptionDate,
                viaName: requestItem.ViaName,
                TechnicianName: requestItem.TechnicianName,
                TechnicianImg: await getWorker(requestItem.RequestID),
              };
              return newItem;
            })
          );
          dispatch(setRequests(data));
          let offset = 0;
          if (page) offset = page;
          dispatch(setTotalPages(data.length));
          dispatch(setCurrentPageData(offset));
        });
    } catch (e) {
      return console.error(e.message);
    }
  };

export const testFilter =
  (
    username: string,
    status: number[],
    years: number[],
    term: string,
    code: string,
    page?: number
  ) =>
  async (dispatch: any) => {
    let filter = "";
    if (status.length > 0) filter = `&serviceOrderStatusID=${status}`;
    let filterYear = "";
    if (years.length > 0) filterYear = `&year=${years}`;
    let filterTerm = "";
    if (term !== "") filterTerm = `&subject=${term}`;
    let filterCode = "";
    if (code !== "") filterCode = `&requestID=${code}`;

    try {
      API()
        .get(
          `services/GetRequests?token=${TokenService.get()}${filterYear}${filter}${filterTerm}${filterCode}&userSearched=${username}`
        )
        .then(async (response) => {
          let data: Request[] = [];
          data = await Promise.all(
            response.data.Values.map(async (requestItem: any) => {
              //   const image = await getWorker(requestItem.RequestID);
              //   console.log(image);
              let newItem = {
                requestID: requestItem.RequestID,
                subject: requestItem.Subject,
                statusName: requestItem.StatusName,
                receptionDate: requestItem.ReceptionDate,
                viaName: requestItem.ViaName,
                TechnicianName: requestItem.TechnicianName,
                TechnicianImg: await getWorker(requestItem.RequestID),
              };
              return newItem;
            })
          );
          dispatch(setRequests(data));
          let offset = 0;
          if (page) offset = page;
          dispatch(setTotalPages(data.length));
          dispatch(setCurrentPageData(offset));
        });
    } catch (e) {
      return console.error(e.message);
    }
  };

export const filterByStatuses = (term: number[]) => async (dispatch: any) => {
  dispatch(setSelectedStatuses(term));
  //dispatch(filterRequests());
};

export const filterByYears = (term: number[]) => async (dispatch: any) => {
  dispatch(setSelectedYears(term));
};

export const filterByTerm = (term: string) => async (dispatch: any) => {
  dispatch(setTerm(term));
};

export const filterByPage = (term: number) => async (dispatch: any) => {
  dispatch(setPage(term));
};

export const filterRequests =
  (username: string, status: number[], years: number[], page?: number) =>
  async (dispatch: any) => {
    let filter = "";
    if (status.length > 0) filter = `&serviceOrderStatusID=${status}`;
    let filterYear = "";
    if (years.length > 0) filter = `&year=${years}`;
    try {
      API()
        .get(
          `services/GetRequests?token=${TokenService.get()}${filterYear}${filter}&userSearched=${username}`
        )
        .then((response) => {
          const data: Request[] = [];
          response.data.Values.forEach((requestItem: any) => {
            data.push({
              requestID: requestItem.RequestID,
              subject: requestItem.Subject,
              statusName: requestItem.StatusName,
              receptionDate: requestItem.ReceptionDate,
              viaName: requestItem.ViaName,
              TechnicianName: requestItem.TechnicianName,
            });
          });
          dispatch(setRequests(data));
          let offset = 0;
          if (page) offset = page;
          dispatch(setTotalPages(data.length));
          dispatch(setCurrentPageData(offset));
        });
    } catch (e) {
      return console.error(e.message);
    }
  };

// New Request
export const getDepartments = () => async (dispatch: any) => {
  try {
    API()
      .get(
        `users/getdepartments?token=${TokenService.get()}
        `
      )
      .then((response) => {
        let departments: ISelect[] = [];
        response.data.Values.map((department: any) => {
          if (department.Text !== "") {
            departments.push({
              value: department.Value,
              label: department.Text,
            });
          }
          return null;
        });
        dispatch(setDepartments(departments));
      });
  } catch (error) {
    console.log(error);
  }
};

export const getLocations = (companyid: string) => async (dispatch: any) => {
  try {
    API()
      .get(
        `users/GetLocations?token=${TokenService.get()}&companyid=${companyid}`
      )
      .then((response) => {
        let Locations: ISelect[] = [];
        response.data.Values.map((location: any) => {
          if (location.Text !== "") {
            Locations.push({ value: location.Value, label: location.Text });
          }
          return null;
        });
        dispatch(setLocations(Locations));
      });
  } catch (error) {
    console.log("Error mio");
  }
};

export const getUsers = (CompanyID: string) => async (dispatch: any) => {
  try {
    API()
      .get(`users/getusers?token=${TokenService.get()}`)
      .then((response) => {
        let filteredUsers: ISelect[] = [];
        response.data.Values.filter(
          (user: any) =>
            user.CompanyID === CompanyID && user.StatusName === "Activo"
        ).map((user: any) => {
          filteredUsers.push({
            label: user.Name + " " + user.LastName,
            value: user.CompanyID + " " + user.Username,
          });
          return null;
        });
        dispatch(setFilteredUsers(filteredUsers));

        let users: Users[] = [];
        response.data.Values.filter(
          (user: any) => user.StatusName === "Activo"
        ).map((item: any) => {
          users.push(item);
          return null;
        });
        dispatch(setUsers(users));
        console.log(filteredUsers);
      });
  } catch (error) {
    console.log(error);
  }
};

export const {
  setRequests,
  setActiveRequest,
  setFilteredRequests,
  setWorkOrders,
  setTerm,
  setAdvancements,
  setFilteredUsers,
  setUsers,
  createSuccess,
  setAreas,
  setServices,
  setAssets,
  setCurrentPageData,
  setTotalPages,
  setStatuses,
  setYears,
  setNotesTypes,
  setNotes,
  setSelectedYears,
  setSelectedStatuses,
  setPage,
  setFiles,
  setDepartments,
  setLocations,
  setAutofillData,
  setWorkOrderId,
} = RequestStore.actions;
export const request = (state: RootState) => state.request;
export default RequestStore.reducer;
