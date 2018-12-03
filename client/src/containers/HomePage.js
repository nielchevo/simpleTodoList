import React, { Component } from 'react';
//import logo from '../images/logo.svg';
import './App.css';
import TodoPage from './TodoPage';
import NavBar from '../components/NavBar';

class HomePage extends Component {
    render() {
        return (
            <div className="wrapper">              
               <NavBar />

                <div className="container">
                    <TodoPage />
                </div>
            </div>
        );
    }
}

export default HomePage;