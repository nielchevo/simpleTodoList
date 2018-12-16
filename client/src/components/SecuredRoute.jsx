import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IsUserAuthenticated } from '../modules/authHelper';

const SecuredRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        IsUserAuthenticated()
            ? <Component {...props} />
            : <Redirect to={
                {
                    pathname: '/login',
                    state: {
                        from: props.location
                    }
                }
            } />
    )} />
)

export default SecuredRoute