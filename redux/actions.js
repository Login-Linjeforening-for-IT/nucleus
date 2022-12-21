export const THEME = 'SET_THEME';
export const LANG = 'SET_LANG';
export const LOGIN_STATUS = 'SET_LOGIN_STATUS'

export const setTheme = theme => dispatch => {
    dispatch({
        type: THEME,
        payload: theme,
    })
}

export const setLang = lang => dispatch => {
    dispatch({
        type: LANG,
        payload: lang,
    })
}

export const setLoginStatus = login => dispatch => {
    dispatch({
        type: LOGIN_STATUS,
        payload: login
    })
}