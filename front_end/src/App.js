import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import HomePage from './HomePage/HomePage';
import LoginPage from './LoginPage/LoginPage';

import Question from './Question/Question';
import Questions from './Questions/Questions';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
            <Route exact path='/' component={HomePage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/register' component={LoginPage} />

            <Route exact path='/adiquestions' component={Questions}/>
            <Route exact path='/question/:questionId' component={Question}/>
      </div>
    );
  }
}

export default App;
