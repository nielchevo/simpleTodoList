import { IsUserAuthenticated } from '../modules/authHelper';

const initialAuthState = {
    isLoggingIn: false,
    isAuthenticated: IsUserAuthenticated(),
    errorMessage: ''
}

export default function auth(state = initialAuthState, action) {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return Object.assign({}, state, {
                isLoggingIn: true,
                isAuthenticated: false,
                user: action.credential,
                errorMessage: ''
            })
        case 'LOGIN_SUCCESS':
            return Object.assign({}, state, {
                isLoggingIn: false,
                isAuthenticated: true,
                errorMessage: ''
            })
        case 'LOGIN_FAILURE':
            return Object.assign({}, state, {
                isLoggingIn: false,
                isAuthenticated: false,
                errorMessage: action.message
            })
        case 'LOGOUT_REQUEST':
            return Object.assign({}, state, {
                isLoggingIn: true,
                isAuthenticated: true
            })
        case 'LOGOUT_SUCCESS':
            return Object.assign({}, state, {
                isLoggingIn: false,
                isAuthenticated: false
            })
        default:
            return state
    }
}