import { createSlice } from "@reduxjs/toolkit";

export const LangSlice = createSlice({
    name: "lang",
    initialState: {
        lang: 0
    },
    reducers: {
        
        changeLang: (state) => {
            state.lang = !state.lang
        },
        
        // Options if we want to add more languages
        // resetLang: (state) => {
        //     state.lang = 0
        // },
        // setLang: (state, action) => {
        //     state.lang = action.payload
        // }
    }
})

export const { changeLang } = LangSlice.actions

export default LangSlice.reducer