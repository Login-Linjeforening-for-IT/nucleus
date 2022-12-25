import { createSlice } from "@reduxjs/toolkit";                             // Creates the slice

export const ThemeSlice = createSlice({                                     // Declares the theme slice
    name: 'theme',                                                          // Names the slice as 'theme'
    initialState: {                                                         // Initial state of the slice
        theme: 0                                                            // Default 0 (dark theme)
    },  
    reducers: {                                                             // Declares reducers
        changeTheme: (state) => {                                           // Function to change theme 
            state.theme+=1                                                  // Increments state.theme by 1
        },
        resetTheme: (state) => {                                            // Function to reset theme
            state.theme = 0                                                 // Sets it to 0 (dark theme)
        },
        setTheme: (state, action) => {                                      // Function to change to a specific theme using a number prop
            state.theme = action.payload                                    // Changes theme based on number given
        }
    }
})

export const { changeTheme, resetTheme, setTheme} = ThemeSlice.actions      // Exports functions

export default ThemeSlice.reducer                                           // Exports the theme slice itself