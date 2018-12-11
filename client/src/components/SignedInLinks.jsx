import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedInLinks = (props) => {
    console.log('signed props:', props);
    return (
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/" onClick={() => props.onLogoutClick()}>Logout</NavLink>
            </li>
        </ul>
    )
}

export default SignedInLinks;