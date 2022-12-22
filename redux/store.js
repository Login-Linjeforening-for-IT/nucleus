import { configureStore } from '@reduxjs/toolkit';
import ThemeReducer from './theme';
import LangReducer from './lang';
import LoginReducer from './loginStatus'

export default configureStore({
    reducer: {
        theme: ThemeReducer,
        lang: LangReducer,
        login: LoginReducer
    }
})