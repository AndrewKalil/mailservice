import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import API from "../../services/API";
import { TokenService } from "../../services/LocalStorage";
import { RootState } from "../store";

interface User {
  username: string;
  name: string;
  lastName: string;
  companyName: string;
  CompanyID: string;
  email: string;
  userImage: string;
  userImageExt: string;
  userImageMime: string;
  isVIP: string;
}

const initialState: User = {
  username: "",
  name: "",
  lastName: "",
  companyName: "",
  CompanyID: "",
  email: "",
  userImage: "",
  userImageExt: "",
  userImageMime: "",
  isVIP: "",
};

export const UserStorage = createSlice({
  name: "user",
  initialState,
  reducers: {
    setDetails: (state, action: PayloadAction<User>) => {
      state.name = action.payload.name;
      state.lastName = action.payload.lastName;
      state.username = action.payload.username;
      state.companyName = action.payload.companyName;
      state.email = action.payload.email;
      state.userImage = action.payload.userImage;
      state.userImageExt = action.payload.userImageExt;
      state.userImageMime = action.payload.userImageMime;
      state.isVIP = action.payload.isVIP;
      state.CompanyID = action.payload.CompanyID;
    },
  },
});

export const getUserDetails = () => async (dispatch: any) => {
  try {
    await API()
      .get(`security/GetUserPermisions?token=${TokenService.get()}`)
      .then((response) => {
        const data: User = {
          username: response.data.Values.UserInfo.Username,
          name: response.data.Values.UserInfo.Name,
          lastName: response.data.Values.UserInfo.LastName,
          companyName: response.data.Values.UserInfo.CompanyName,
          email: response.data.Values.UserInfo.Email,
          userImage: response.data.Values.UserInfo.UserImage,
          userImageExt: response.data.Values.UserInfo.UserImageExt,
          userImageMime: response.data.Values.UserInfo.UserImageMime,
          isVIP: response.data.Values.UserInfo.IsVIP,
          CompanyID: response.data.Values.UserInfo.CompanyID,
        };
        return dispatch(setDetails(data));
      });
  } catch (e) {
    return console.error(e.message);
  }
};

export const { setDetails } = UserStorage.actions;
export const user = (state: RootState) => state.user;
export default UserStorage.reducer;
