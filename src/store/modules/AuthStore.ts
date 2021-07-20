import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserLogin } from "./../../interfaces/UserLogin";
import API from "./../../services/API";
import { TokenService } from "./../../services/LocalStorage";
import { RootState } from "./../store";

interface AlertType {
  isOpen: boolean;
  content: string;
}

interface IAuth {
  token: string;
  error: string;
  count: number;
  alert: AlertType;
  tokenValid: boolean;
}

const initialState: IAuth = {
  token: "-1",
  error: "",
  count: 0,
  alert: { isOpen: false, content: "" },
  tokenValid: false,
};

export const AuthStore = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logoutSuccess: (state) => {
      state.token = "-1";
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    increaseCounter: (state) => {
      state.count = state.count + 1;
    },
    resetCounter: (state) => {
      state.count = 0;
    },
    setAlert: (state, action: PayloadAction<AlertType>) => {
      state.alert = action.payload;
    },
    setTokenChecked: (state, action: PayloadAction<boolean>) => {
      state.tokenValid = action.payload;
    },
  },
});

export const {
  loginSuccess,
  logoutSuccess,
  setError,
  increaseCounter,
  resetCounter,
  setAlert,
  setTokenChecked,
} = AuthStore.actions;

export const selectUser = (state: RootState) => state.auth;

export const handleAlert = (payload: AlertType) => (dispatch: any) => {
  dispatch(setAlert(payload));
};

export const login = (user: UserLogin) => async (dispatch: any) => {
  try {
    // const res = await api.post('/api/auth/login/', { username, password })
    API()
      .post(`security/gettoken`, user)
      .then((response) => {
        let data = response.data;
        if (data.Status === "Fail") {
          dispatch(setError("error"));
          dispatch(increaseCounter());
        } else {
          dispatch(resetCounter());
          TokenService.set(data.Token);
          dispatch(setError(""));
          dispatch(loginSuccess(data.Token));
        }
      });
  } catch (e) {
    dispatch(setError("error"));
    return console.error(e.message);
  }
};

export const setToken = (token: any) => (dispatch: any) => {
  if (token) {
    TokenService.set(token);
    dispatch(loginSuccess(token));
  } else {
    dispatch(setAlert({ isOpen: true, content: "Se requiere un token!" }));
  }
};

export const checkToken = (token: any) => async (dispatch: any) => {
  try {
    // const res = await api.post('/api/auth/login/', { username, password })
    API()
      .get(`security/checktoken?token=${token}`)
      .then((response) => {
        let data = response.data;
        if (data.Status === "Ok") {
          dispatch(setTokenChecked(true));
        } else if (token && data.Status !== "Ok") {
          dispatch(setAlert({ isOpen: true, content: "Token no valido!" }));
          dispatch(setTokenChecked(false));
        }
      });
  } catch (e) {
    dispatch(setError("error"));
    return console.error(e.message);
  }
};

export const logout = () => async (dispatch: any) => {
  try {
    TokenService.remove();
    dispatch(setError(""));
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};

export const auth = (state: RootState) => state.auth;

export default AuthStore.reducer;
