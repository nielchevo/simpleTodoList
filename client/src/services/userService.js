import axios from 'axios';
import { setToken } from '../modules/authHelper';
import * as userApi from '../api/UserApi';

export const userService = {
    login,
    logout
}

function login(credential) {    
    return axios.post(userApi.user_login(), credential)
        .then(response => {
            setToken(response.data.token);
            return response.data;
        });
}

function logout() {

}