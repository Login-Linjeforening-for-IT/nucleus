import {SET_THEME, SET_LANG, LOGIN_STATUS} from "./actions";

const initialState = {
    theme: 0,
    lang: 'no',
    login: 0
}

function userReducer(state = initialState, action) {
    switch(action.type){
        case SET_THEME: return{...state, theme: action.payload}
        case SET_LANG: return{...state, lang: action.payload}
        case LOGIN_STATUS: return{...state, login: action.payload}
        default: return state;
    }
}

export default userReducer;