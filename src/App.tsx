import React, { FC } from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import Home from "@pages/home"
import QRCode from "@pages/qrcode"
import QRCodeCustom from "@pages/qrcode-custom"
import './App.css';

const App: FC = () => (
  <Router>
    <Route path="/home" component={Home} />
    <Route path="/qrcode" component={QRCodeCustom} />
    <Route exact path={`/anyone-short/qrcode/:id`} component={QRCode} />
    <Route exact path="/">
      <Redirect to="/home/anyone-short" />
    </Route>

  </Router>
);
export default App;