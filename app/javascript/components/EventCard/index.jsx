import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const EventCard = ({eventData}) => {
  const {name, date, cost, active, registration_to, paid, id} = eventData;
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
    const regDate = new Date(registration_to);
    const todayDate = new Date();

    return regDate <= todayDate ? 'close' : 'open';
  }

  const deleteEvent = (eventId) => {
    const url = `/events/${eventId}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => window.location.reload(false))
      .catch(error => console.log(error.message));
  }

  return (
    <div className="col mb-3">
      <div className="card" >
        <div className="card-body">
          <h3 className="card-title title">{name}</h3>
          <p className="card-text">Date: {formatDate(date)}</p>
          <p className="card-text">Price: { paid ? getCost(cost) : 'Free'}</p>
          <p className="card-text">Registration: { checkRegistrationStatus()}</p>
          <p className={"card-text badge badge-pill " + activeClass(active)}>{active ? 'active' : 'inactive'}</p>
        </div>
        <div className="card-footer text-right">
          <Link to={`/edit_event/${id}`}>
            <FontAwesomeIcon icon={faEdit} />
          </Link>
          <span className="ml-2 text-danger delete-event" onClick={() => deleteEvent(id)}>
            <FontAwesomeIcon icon={faTrash} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default EventCard;