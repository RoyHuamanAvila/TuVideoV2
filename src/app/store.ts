import { configureStore } from "@reduxjs/toolkit";
import channelReducer from "../features/channel/channelSlice";

export const store = configureStore({
    reducer: {
        yourChannel: channelReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
