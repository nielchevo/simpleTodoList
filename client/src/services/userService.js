import axios from 'axios';
import { authHeader } from '../modules/Auth';
import * as userApi from '../api/UserApi';

export const userService = {
    login,
    logout
}

function login(credential) {    
    return axios.post(userApi.user_login(), credential)
        .then(response => {
            console.log("userService login success:", response);
            localStorage.setItem('syot_token', response.data.token);
            return response.data;
        });
}

function logout() {

}