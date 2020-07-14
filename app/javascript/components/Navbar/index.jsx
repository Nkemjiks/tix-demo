import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/tix-logo.svg";

const Navigation = () => (
  <nav className="navbar navbar-light bg-light">
    <a className="navbar-brand" href="/">
      <img src={logo} width="30" height="30" alt="" loading="lazy" />
    </a>
    <Link
      to="/new_event"
      className="btn btn-outline-primary"
      role="button"
    >
      + New Event
    </Link>
  </nav>
);

export default Navigation;