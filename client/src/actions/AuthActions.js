//import axios from 'axios';
import { userService } from '../services/userService';

// LOGIN ACTIONS
const api_login = 'http://localhost:5000/user/login'

const requestLogin = (credential) => ({
    type: 'LOGIN_REQUEST',
    isLoggingIn: true,
    isAuthenticated: false,
    credential
})

const receiveLogin = () => ({
    type: 'LOGIN_SUCCESS',
    isLoggingIn: false,
    isAuthenticated: true,
})

const loginError = (message) => ({
    type: 'LOGIN_FAILURE',
    isLoggingIn: false,
    isAuthenticated: false,
    message
})

export function loginUser(credential) {
    return dispatch => {
        dispatch(requestLogin(credential))

        //axios.post(api_login, credential)
        //    .then(response => {
        //        console.log("auth action login:", response);
        //        localStorage.setItem('syot_token', response.data.token);
        //        dispatch(receiveLogin(response.data));
        //    })
        //    .catch(err => {
        //        console.log("auth action error:", err);
        //        dispatch(loginError(err));
        //    })
        userService.login(credential)
            .then(response => {
                dispatch(receiveLogin());
            })
            .catch(err => {
                dispatch(loginError(err));
            });
    }
}

// LOGOUT ACTIONS
const requestLogout = () => ({
    type: 'LOGOUT_REQUEST',
    isLoggingIn: true,
    isAuthenticated: true
})

const receiveLogout = () => ({
    type: 'LOGOUT_SUCCESS',
    isLoggingIn: false,
    isAuthenticated: false
})

export function logoutUser() {
    console.log('auth action logout user');
    return dispatch => {
        dispatch(requestLogout())
        localStorage.removeItem('syot_token')
        dispatch(receiveLogout())
    }
}