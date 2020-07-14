import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const EventCard = ({ name, date, cost, active, regActiveFrom, regActiveTo, paid}) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const formatDate = (date) => {
    const eventDate = new Date(date);
    return `${months[eventDate.getMonth()]} ${eventDate.getDate()}, ${eventDate.getFullYear()}`
  }

  const getCost = (cost) => (
    `\u20a6${cost}`
  )

  const activeClass = (active) => (
    active ? 'badge-success' : 'badge-warning'
  )

  const checkRegistrationStatus = () => {
    const regDate = new Date(regActiveTo);
    const todayDate = new Date();

    return regDate <= todayDate ? 'close' : 'open';
  }

  return (
    <div className="col mb-3">
      <div className="card" >
        <div className="card-body">
          <a href='/' className="card-title title">{name}</a>
          <p className="card-text">Date: {formatDate(date)}</p>
          <p className="card-text">Cost: { paid ? getCost(cost) : 'Free'}</p>
          <p className="card-text">Registration: { checkRegistrationStatus()}</p>
          <p className={"card-text badge badge-pill " + activeClass(active)}>{active ? 'active' : 'inactive'}</p>
        </div>
        <div className="card-footer text-right">
          <Link to="/edit">
            <FontAwesomeIcon icon={faEdit} />
          </Link>
          <span className="ml-2 text-danger">
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default EventCard;