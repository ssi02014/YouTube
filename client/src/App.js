import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/views/HomePage/HomePage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';

function App() {
  return (
    <>
      <Router>
          <Switch>
            <Route exact path="/" component={Auth(HomePage, null)}></Route>
            <Route path="/login" component={Auth(LoginPage, false)}></Route>
            <Route path="/register" component={Auth(RegisterPage, false)}></Route>
          </Switch>
      </Router>
    </>
  );
}

export default App;
