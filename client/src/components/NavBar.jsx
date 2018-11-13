import React from 'react';

const NavBar = (props) => {
    return(
        <nav className="navbar navbar-expand-sm navbar-right bg-light justify-content-end">
            <ul className="navbar-nav">
                {/* TODO: convert nav-item to component so it can handle the onclick 'active' 
                    https://stackoverflow.com/questions/22461129/switch-class-on-tabs-with-react-js*/}
                <li className="nav-item active">
                    <a className="nav-link" href="#">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">About</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Login</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Register</a>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;