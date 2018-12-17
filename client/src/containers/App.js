import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import Login from './Login';
import TodoPage from './TodoPage';
import NotFoundPage from './NotFoundPage';
import SecuredRoute from '../components/SecuredRoute';

class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <SecuredRoute exact path='/' component={HomePage} />
                    <Route path='/login' component={Login} />
                    <Route path='/todo' component={TodoPage} />
                    <Route path="*" component={NotFoundPage} />
                </Switch>
            </div>
        );
    }
}

export default App;
