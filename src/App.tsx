import React, { FC } from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from "@pages/home"
import './App.css';

const App: FC = () => (
  <Router>
    <Route path="/home" component={Home} />
    <Route exact path="/">
      <Redirect to="/home/anyone-short" />
    </Route>
  </Router>
);
export default App;