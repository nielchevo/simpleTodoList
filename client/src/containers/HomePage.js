import React, { Component } from 'react';
import logo from '../images/logo.svg';
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

                {/*
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        React project structured following
                    </p>
                    <p>
                        <a
                            className="App-link"
                            href="https://daveceddia.com/react-project-structure/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            this reference
                        </a>
                    </p>
                </header>
                */}
            </div>
        );
    }
}

export default HomePage;