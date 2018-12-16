import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';
import TodoPage from './TodoPage';
import SecuredRoute from '../components/SecuredRoute';

class App extends Component {
    render() {
        return (
            <div>
                <SecuredRoute exact path='/' component={HomePage} />
                <Route path='/login' component={Login} />
                <Route path='/todo' component={TodoPage} />

            </div>
        );
    }
}

export default App;
