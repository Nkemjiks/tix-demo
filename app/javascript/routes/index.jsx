import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Navigation from '../components/Navbar';

const Routes = () => (
  <Router>
    <Navigation />
    <Switch>
      <Route path="/" exact component={Home} />
    </Switch>
  </Router>
);

export default Routes;