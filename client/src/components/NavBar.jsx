import React from 'react';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const NavBar = (props) => {
    console.log('navbar props:', props);
    const links = (props.isAuthenticated) ?
        <SignedInLinks onLogoutClick={props.onLogoutClick} /> : <SignedOutLinks />;

    return (
        <nav className="navbar navbar-expand-sm navbar-right bg-light justify-content-end">
            {/* TODO: convert nav-item to component so it can handle the onclick 'active' 
            https://stackoverflow.com/questions/22461129/switch-class-on-tabs-with-react-js*/}
            {links}
        </nav>
    );
};

export default NavBar;