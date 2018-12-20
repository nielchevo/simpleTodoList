export const IsUserAuthenticated = () => {
    return localStorage.getItem('syot_token') !== null;
}

export function authHeader() {
    let token = localStorage.getItem('syot_token');

    if (token) {
        return { headers: { Authorization: 'Token ' + token } };
    } else {
        return {};
    }
}

export function setToken(token) {
    if (token && token !== "") {
        localStorage.setItem('syot_token', token);
    }
}