import { createSlice } from "@reduxjs/toolkit";
import { MyChannel } from "../../interfaces";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: MyChannel = {
  active: false,
  logo: "",
  name: "",
};

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    createChannel: (state, action: PayloadAction<MyChannel>) => {
      const { logo, name } = action.payload;
      state.logo = logo;
      state.name = name;
      state.active = true;
    },
    editChannel: (state, action: PayloadAction<MyChannel>) => {
      const { logo, name } = action.payload;
      state.logo = logo;
      state.name = name;
    },
  },
});

export const { createChannel, editChannel } = channelSlice.actions;
export default channelSlice.reducer;
