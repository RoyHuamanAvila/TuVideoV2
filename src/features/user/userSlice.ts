import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { UserData } from "../../interfaces";

const initialState: UserData = {} as UserData;

interface dataGetUser {
  token: string;
  userID: string;
}

export const axiosGetUser = createAsyncThunk(
  "user/getUser",
  async ({ token, userID }: dataGetUser) => {
    const DOMAIN: string = import.meta.env.VITE_DOMAIN;

    const response = await axios.request({
      url: `https://${DOMAIN}/api/v2/users/${userID}`,
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      axiosGetUser.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        return { ...action.payload };
      }
    );
  },
});

export default userSlice.reducer;
