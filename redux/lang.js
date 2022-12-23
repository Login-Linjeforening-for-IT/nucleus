import { createSlice } from "@reduxjs/toolkit";

export const LangSlice = createSlice({
    name: "lang",
    initialState: {
        lang: 1
    },
    reducers: {
        changeLang: (state) => {
            state.lang = !state.lang
        },
    }
})

export const { changeLang } = LangSlice.actions

export default LangSlice.reducer