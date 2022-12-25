import { createSlice } from "@reduxjs/toolkit";             // Imports slicer

export const LoginSlice = createSlice({                     // Declares Login status slice
    name: 'login',                                          // Slice name
    initialState: {                                         // Initial state
        login: 0                                            // 1 is logged in, 0 is logged out
    },
    reducers: {                                             // Declares slice reducer
        changeLoginStatus: (state) => {                     // Function to change login status
            state.login = !state.login                      // Uses true false for 0 / 1
        }
    }
});

export const { changeLoginStatus } = LoginSlice.actions;    // Exports change login status function

export default LoginSlice.reducer                           // Exports the login status slice