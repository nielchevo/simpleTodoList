import axios from 'axios';

// LOGIN ACTIONS
const api_login = 'http://localhost:5000/user/login'

const requestLogin = (credential) => ({
    type: 'LOGIN_REQUEST',
    isFetching: true,
    isAuthenticated: false,
    credential
})

const receiveLogin = (user) => ({
    type: 'LOGIN_SUCCESS',
    isFetching: false,
    isAuthenticated: true,
    token: user.token
})

const loginError = (message) => ({
    type: 'LOGIN_FAILURE',
    isFetching: false,
    isAuthenticated: false,
    message
})

export function loginUser(credential) {
    return dispatch => {
        dispatch(requestLogin(credential))

        return axios.post(api_login, credential)
            .then(response => {
                console.log("auth action login:", response);
                localStorage.setItem('syot_token', response.data.token);
                dispatch(receiveLogin(response.data));
            })
            .catch(err => {
                console.log("auth action error:", err);
                dispatch(loginError(err));
            })
    }
}

// LOGOUT ACTIONS
const requestLogout = () => ({
    type: 'LOGOUT_REQUEST',
    isFetching: true,
    isAuthenticated: true
})

const receiveLogout = () => ({
    type: 'LOGOUT_SUCCESS',
    isFetching: false,
    isAuthenticated: false
})

export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout())
        localStorage.removeItem('syot_token')
        dispatch(receiveLogout())
    }
}