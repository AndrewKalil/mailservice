import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserLogin } from "./../../interfaces/UserLogin";
import API from "./../../services/API";
import { TokenService } from "./../../services/LocalStorage";
import { RootState } from "./../store";

interface IAuth {
  token: string;
  error: string;
  count: number;
}

const initialState: IAuth = {
  token: "-1",
  error: "",
  count: 0,
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
  },
});

export const {
  loginSuccess,
  logoutSuccess,
  setError,
  increaseCounter,
  resetCounter,
} = AuthStore.actions;

export const selectUser = (state: RootState) => state.auth;

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

export const checkToken = () => async (dispatch: any) => {
  try {
    // const res = await api.post('/api/auth/login/', { username, password })
    API()
      .get(`security/checktoken?token=${TokenService.get()}`)
      .then((response) => {
        let data = response.data;
        if (data.Status === "Fail") {
          return dispatch(logoutSuccess());
        } else {
          dispatch(loginSuccess(data.Token));
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

export default AuthStore.reducer;
