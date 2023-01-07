import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Channel, ThunkDataTransfer } from "../../interfaces";
import axios from "axios";

const initialState: Channel = {} as Channel;

export const axiosCreateChannel = createAsyncThunk(
  "channel/create",
  async ({ data, token }: ThunkDataTransfer) => {
    const url = `${import.meta.env.VITE_DOMAIN_BD}/channel`;
    const response = await axios.request({
      url,
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      data,
    });
    return response.data;
  }
);

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(axiosCreateChannel.fulfilled, (state, action) => {
      return { ...action.payload };
    });
  },
});

export default channelSlice.reducer;
