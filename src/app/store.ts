import { configureStore } from "@reduxjs/toolkit";
import channelReducer from "../features/channel/channelSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    yourChannel: channelReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
