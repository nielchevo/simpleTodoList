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