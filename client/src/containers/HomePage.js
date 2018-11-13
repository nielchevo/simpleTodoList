import React, { Component } from 'react';
import logo from '../images/logo.svg';
import './App.css';
import TodoPage from './TodoPage';
import NavBar from '../components/NavBar';

class HomePage extends Component {
    render() {
        return (
            <div className="wrapper">
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
                
               <NavBar />

                <div className="container">
                    <content className="todoPage">
                        <div className="todoTask-01" >
                            <p>Todo Task 01 Title Here </p>
                            <ul>
                                <li>Todo Item 1</li>
                                <li>todo Item 2</li>
                                <li>todo Item 3</li>
                            </ul>
                            <form>
                                <input placeholder="input new todo item"></input>
                                <button>Add new todo</button>
                            </form>
                        </div>
                        <div className="todoTask-02" >
                            <p>Todo Task 02 Title Here </p>
                            <ul>
                                <li>Todo Item 1</li>
                                <li>Todo Item 2</li>
                                <li>Todo Item 3</li>
                            </ul>
                            <form>
                                <input placeholder="input new todo item"></input>
                                <button>Add new todo</button>
                            </form>
                        </div>
                    </content>
                    <hr/>

                    <TodoPage/>
                </div>
            </div>
        );
    }
}

export default HomePage;