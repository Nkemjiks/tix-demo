import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Navigation from '../components/Navbar';
import CreateEvent from '../components/CreateEvent';
import EditEvent from '../components/EditEvent';

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/new_event" exact component={CreateEvent} />
      <Route path="/edit_event/:event_id" exact component={EditEvent} />
    </Switch>
  </Router>
);

export default Routes;