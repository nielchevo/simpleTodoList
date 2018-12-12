import React, { Component } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import Auth from '../modules/Auth';

class Login extends Component {

    handleClearForm() {

    }

    render() {
        return (
            <div>
                <input type='text' ref='username' name='username' className="form-control" placeholder='username' />
                <input type='password' ref='password' name='password' className="form-control" placeholder='password' />
                <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
                    LoginTes
                </button>
            </div>
        )
    }

    handleClick(event) {
        const username = this.refs.username;
        const password = this.refs.password;
        const creds = { username: username.value.trim(), password: password.value.trim() };        
        this.props.onLoginClick(creds)   
    }

}

export default Login;