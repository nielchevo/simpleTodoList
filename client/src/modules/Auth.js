import axios from 'axios';

const api_login = 'http://localhost:5000/user/login'

class Auth {
    constructor() {
        this.getToken = this.getToken.bind(this);
        this.isUserAuthenticated = this.isUserAuthenticated.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    getProfile() {
        //
    }

    getToken() {
        return localStorage.getItem('syot_token');
    }

    isUserAuthenticated() { // useful in NavBar, check if user loggedin or not
        return localStorage.getItem('syot_token') !== null;
    }

    login = (username, password, callback) => {
        axios.post(api_login, {
            username: username,
            password: password
        })
        .then(res => {            
            this.setToken(res.data.token);    
            // Temporary, remove after redux
            callback(res.data);
        })
        .catch(err => {            
            console.log("failed login");
        });
    }

    logout() {
        localStorage.removeItem('syot_token');
    }

    setToken(token) {
        localStorage.setItem('syot_token', token);
    }

}

export default Auth;