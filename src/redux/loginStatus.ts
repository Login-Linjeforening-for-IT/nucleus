import { createSlice } from "@reduxjs/toolkit"

// Declares Login status slice
export const LoginSlice = createSlice({
    // Slice name
    name: "login",
    // Initial state
    initialState: {
        // true is logged in, false is logged out
        login: false
    },
    // Declares slice reducer
    reducers: {
        // Function to change login status
        changeLoginStatus(state) {
            state.login = !state.login
        }
    }
})

// Exports change login status function
export const { changeLoginStatus } = LoginSlice.actions

// Exports the login status slice
export default LoginSlice.reducer
