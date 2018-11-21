import React from 'react';

const NavBar = (props) => {
    
    const onClickHandle = (e) => {
        console.log('onClickHandle() event');
    }

    return(
        <nav className="navbar navbar-expand-sm navbar-right bg-light justify-content-end">
            <ul className="navbar-nav">
                {/* TODO: convert nav-item to component so it can handle the onclick 'active' 
                    https://stackoverflow.com/questions/22461129/switch-class-on-tabs-with-react-js*/}
                <li className="nav-item active">
                    <a className="nav-link" href="#section" onClick={onClickHandle}>Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#section" onClick={onClickHandle}>About</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#section"  onClick={onClickHandle}>Login</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#section" onClick={onClickHandle}>Register</a>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;