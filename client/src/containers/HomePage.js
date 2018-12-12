import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './App.css';
import TodoPage from './TodoPage';
import Login from './Login';
import NavBar from '../components/NavBar';
import { loginUser, logoutUser } from '../actions/AuthActions';

class HomePage extends Component {
    render() {
        const { dispatch, isAuthenticated, errorMessage } = this.props;   
        if (isAuthenticated) {
            return (
                <div className="wrapper">
                    <NavBar
                        isAuthenticated={isAuthenticated}
                        dispatch={dispatch}
                        onLogoutClick={() => dispatch(logoutUser())}
                    />

                    <div className="container">
                        <TodoPage />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="container">
                    <Login
                        errorMessage={errorMessage}
                        dispatch={dispatch}
                        onLoginClick={creds => dispatch(loginUser(creds))}
                    />
                </div>
            );
        }

    }
}

function mapStateToProps(state) {
    const { auth, todo } = state
    const { isAuthenticated, errorMessage } = auth
    //const { todos } = todo

    return {
        //todos,
        isAuthenticated,
        errorMessage
    }
}

export default connect(mapStateToProps)(HomePage);