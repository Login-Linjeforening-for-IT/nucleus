import { configureStore } from '@reduxjs/toolkit';
import ThemeReducer from './theme';
import LangReducer from './lang';

export default configureStore({
    reducer: {
        theme: ThemeReducer,
        lang: LangReducer
    }
})