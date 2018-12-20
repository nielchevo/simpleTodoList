import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AuthActions from '../actions/AuthActions';

const widthStyle = {
    width: '100%'
}

class Login extends Component {
    constructor(props) {
        super(props);

        console.log('Login props:', props);
        props.actions.logoutUser();
    }

    handleClearForm() {
        this.refs.password.value = "";
    }

    handleErrorMessage() {
        const { errorMessage } = this.props;
        if (errorMessage !== "") {
            return (
                <div className="alert alert-dismissible alert-primary">
                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                    {errorMessage}
                </div>)
        }
    }

    render() {
        const { isLoggingIn, isAuthenticated } = this.props;

        if (isAuthenticated) return <Redirect to='/' />

        const loadingIndicator = (isLoggingIn) ? (
            <div className="progress">
                <div className="progress-bar progress-bar-striped bg-info" role="progressbar" style={widthStyle} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        ) :
            (null);

        return (
            <div className="container login-page">
                <div className="row justify-content-center align-items-center">
                    <div className="card border-secondary col-6">
                        <div className="card-header"></div>
                        <div className="card-body">
                            <input type='text' ref='username' name='username' className="form-control" placeholder='username' />
                            <input type='password' ref='password' name='password' className="form-control" placeholder='password' />
                            <button onClick={(event) => this.handleClick(event)} className="btn btn-secondary">
                                login
                            </button>
                            {loadingIndicator}
                            {this.handleErrorMessage()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    handleClick(event) {
        event.preventDefault();

        const username = this.refs.username.value.trim();
        const password = this.refs.password.value.trim();
        //const creds = { username: username.value.trim(), password: password.value.trim() };   
        if (username && password) {
            this.props.actions.loginUser({ username, password });
        }
        this.handleClearForm();
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