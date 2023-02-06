import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Channel, ThunkDataTransfer } from "../../interfaces";
import axios from "axios";
import { toast } from "react-toastify";

const initialState: Channel = {} as Channel;
const DOMAIN_BD = import.meta.env.VITE_DOMAIN_BD;

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

export const getChannel = createAsyncThunk(
  "channel/getData",
  async (channelID: string) => {
    try {
      const response = await axios.get(`${DOMAIN_BD}/channel/${channelID}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const subscribe = createAsyncThunk(
  "channel/subscribe",
  async ({ subscribeID, token }: { subscribeID: string; token: string }) => {
    try {
      const response = await axios.request({
        url: `${DOMAIN_BD}/channel/subscribe/${subscribeID}`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      });
      toast("Successful subscribe", {
        type: "success",
      });
      return response.data;
    } catch (error) {
      toast("Error to subscribe", {
        type: "error",
      });
      throw new Error("Error to subscribe");
    }
  }
);

export const unSubscribe = createAsyncThunk(
  "channel/unSuscribe",
  async ({ channelID, token }: { channelID: string; token: string }) => {
    try {
      const response = await axios.request({
        url: `${DOMAIN_BD}/channel/unsubscribe/${channelID}`,
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      });
      toast("Successful unsubscribe", {
        type: "success",
      });
      return response.data;
    } catch (error) {
      toast("Error to unsubscribe", {
        type: "error",
      });
      throw new Error("Error to unsubscribe");
    }
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

    builder.addCase(getChannel.fulfilled, (state, action) => {
      return { ...action.payload };
    });

    builder.addCase(subscribe.fulfilled, (state, action) => {
      state.subscribes.push(action.payload);
    });

    builder.addCase(unSubscribe.fulfilled, (state, action) => {
      state.subscribes = state.subscribes.filter(
        (channel) => channel._id !== action.payload._id
      );
    });
  },
});

export default channelSlice.reducer;
