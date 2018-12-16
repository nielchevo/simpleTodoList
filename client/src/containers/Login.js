import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Input from '../components/Input';
import Button from '../components/Button';
import Auth from '../modules/Auth';
import * as AuthActions from '../actions/AuthActions';

class Login extends Component {
    constructor(props) {
        super(props);

        console.log('Login props:', props);
        props.actions.logoutUser();
    }

    handleClearForm() {

    }

    render() {
        const { isAuthenticated } = this.props;
        if (isAuthenticated) return <Redirect to='/' />
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
        const username = this.refs.username.value.trim();
        const password = this.refs.password.value.trim();
        //const creds = { username: username.value.trim(), password: password.value.trim() };   
        if (username && password) {
            this.props.actions.loginUser({ username, password });
        } 
    }
}

function mapStateToProps(state) {
    const { isLoggingIn, isAuthenticated, errorMessage } = state.auth

    return {
        isLoggingIn,
        isAuthenticated,
        errorMessage
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators(AuthActions, dispatch)
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);