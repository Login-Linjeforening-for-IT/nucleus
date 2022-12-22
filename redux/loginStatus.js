import { createSlice } from "@reduxjs/toolkit"; 

export const LoginSlice = createSlice({
    name: 'login',
    initialState: {
        login: 0
    },
    reducers: {
        changeLoginStatus: (state) => {
            state.login = !state.login
        }
    }
});

export const { changeLoginStatus } = LoginSlice.actions;

export default LoginSlice.reducer