import React from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../../../assets/images/tix-logo.svg";

const Navigation = (props) => {
  const allowedPaths = ['/', '/new_event', '/edit_event'];

  return allowedPaths.includes(props.location.pathname) ? (
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
  ) : '';
}

export default withRouter(Navigation);