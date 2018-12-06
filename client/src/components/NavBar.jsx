import React from 'react';
import Auth from '../modules/Auth';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const NavBar = () => {
    
    var auth = new Auth();
    console.log("navbar is user authenticated:", auth.isUserAuthenticated());
    const links = auth.isUserAuthenticated() ? 
        <SignedInLinks /> : <SignedOutLinks />;

    return(
        <nav className="navbar navbar-expand-sm navbar-right bg-light justify-content-end">
            {/* TODO: convert nav-item to component so it can handle the onclick 'active' 
                https://stackoverflow.com/questions/22461129/switch-class-on-tabs-with-react-js*/}
            { links }
        </nav>
    );
};

export default NavBar;