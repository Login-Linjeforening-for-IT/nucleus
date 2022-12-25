import { createSlice } from "@reduxjs/toolkit";

export const ThemeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: 0
    },
    reducers: {
        
        changeTheme: (state) => {
            state.theme+=1
        },
        resetTheme: (state) => {
            state.theme = 0
        },
        setTheme: (state, action) => {
            state.theme = action.payload
        }
    }
})

export const { changeTheme, resetTheme, setTheme} = ThemeSlice.actions

export default ThemeSlice.reducer