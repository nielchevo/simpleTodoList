import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import TodoPage from './TodoPage';
import TestPage from './TestPage';

class App extends Component {
  render() {
    return (
      <div>        
        <Route exact path='/' component={HomePage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/todo' component={TodoPage} />

        <Route path='/test' component={TestPage} />
      </div>
    );
  }
}

export default App;
