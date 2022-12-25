import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkMode: false,
}

export const aplicationSlice = createSlice({
    name: 'aplication',
    initialState,
    reducers: {}
})

export default aplicationSlice.reducer
