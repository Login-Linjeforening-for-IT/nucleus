import { createSlice } from "@reduxjs/toolkit";     // Imports slicer

export const LangSlice = createSlice({              // Declares Language Slice
    name: 'lang',                                   // Slice name
    initialState: {                                 // Initial state
        lang: 1                                     // 1 is Norwegian, 0 is English
    },
    reducers: {                                     // Declares slice reducer
        changeLang: (state) => {                    // Function to change language
            state.lang = !state.lang                // Uses true false for 0 / 1
        },
    }
})

export const { changeLang } = LangSlice.actions     // Exports the change function

export default LangSlice.reducer                    // Exports the language slice