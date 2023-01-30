import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { UserData } from "../../interfaces";
import { CreateComment, CreateVideo, Subscribe } from "../../interfaces/dto";
import { convertToFormData } from "../../utils/convert";

const initialState: UserData = {} as UserData;

interface dataGetUser {
  token: string;
  userID: string;
}

const DOMAIN_BD = import.meta.env.VITE_DOMAIN_BD;

export const getUserAuth0 = createAsyncThunk(
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

export const subscribe = createAsyncThunk(
  "user/subscribe",
  async ({ channelID, token }: Subscribe) => {
    const DOMAIN_BD: string = import.meta.env.VITE_DOMAIN_BD;
    const response = await axios.request({
      url: `${DOMAIN_BD}/channel/subscribe/${channelID}`,
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });

    return response.data;
  }
);

export const uploadVideo = createAsyncThunk(
  "user/upload",
  async ({ token, data }: CreateVideo) => {
    const DOMAIN_BD: string = import.meta.env.VITE_DOMAIN_BD;
    const response = await axios.request({
      url: `${DOMAIN_BD}/video`,
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
      },
      data: convertToFormData(data),
    });

    return response.data;
  }
);

export const comment = createAsyncThunk(
  "user/comment",
  async (newData: CreateComment) => {
    const { content, token, videoID } = newData;
    const response = await axios.request({
      url: `${DOMAIN_BD}/comment/${videoID}`,
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      data: { content },
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
      getUserAuth0.fulfilled,
      (state, action: PayloadAction<UserData>) => {
        return { ...action.payload };
      }
    );
  },
});

export default userSlice.reducer;
