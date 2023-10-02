import { createSlice } from "@reduxjs/toolkit"

// Declares the theme slice
export const ThemeSlice = createSlice({
    // Names the slice as "theme"
    name: "theme",
    // Initial state of the slice
    initialState: {
        // Default 0 (dark theme)
        theme: 0
    },
    // Declares reducers
    reducers: {
        // Function to change theme
        changeTheme: (state) => {
            // Increments state.theme by 1
            state.theme+=1
        },
        // Function to reset theme
        resetTheme: (state) => {
            // Sets it to 0 (dark theme)
            state.theme = 0
        },
        // Function to change to a specific theme using a number prop
        setTheme: (state, action) => {
            // Changes theme based on number given
            state.theme = action.payload
        }
    }
})

// Exports functions
export const { changeTheme, resetTheme, setTheme} = ThemeSlice.actions

// Exports the theme slice itself
export default ThemeSlice.reducer
