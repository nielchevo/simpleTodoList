export const IsUserAuthenticated = () => {
    return localStorage.getItem('syot_token') !== null;
}