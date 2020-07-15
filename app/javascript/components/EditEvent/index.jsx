import React, { useState, useEffect } from 'react';
import Loader from '../Loader';

const EditEvent = (props) => {
  const [eventData, setEventData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const url = `/events/${props.match.params.event_id}`;
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        setEventData(response);
        setLoading(false);
      })
      .catch(() => this.props.history.push("/login"));
  }, []);

  const handleChange = (event) => {
    setEventData({
      ...eventData,
      [event.target.id] : event.target.value
    })
  }

  const handlePaidCheckedChange = (event) => {
    if(event.target.id === 'paid' && !event.target.checked) {
      setEventData({
        ...eventData,
        [event.target.id] : event.target.checked,
        cost: 0,
      })
    } else {
      setEventData({
        ...eventData,
        [event.target.id] : event.target.checked
      })
    }
  }

  const handleActiveCheckedChange = (event) => {
    setEventData({
      ...eventData,
      [event.target.id] : event.target.checked
    })
  }

  const renderPrice = () => (
    <div className="form-row mt-3 mb-3">
      <div className="col">
        <label htmlFor="cost">Price *</label>
        <input type="number" className="form-control" id="cost" placeholder="1000" value={eventData.cost} onChange={handleChange} required />
      </div>
    </div>
  )

  const renderRegistrationDate = () => (
    <div className="form-row mt-3 mb-3">
      <div className="col">
        <label htmlFor="registration_from">Registration Start date *</label>
        <input type="datetime-local" className="form-control" id="registration_from" placeholder="Start date" value={formatDateTime(eventData.registration_from)} onChange={handleChange} required />
      </div>
      <div className="col">
        <label htmlFor="registration_to">Registration End date *</label>
        <input type="datetime-local" className="form-control" id="registration_to" placeholder="End date" value={formatDateTime(eventData.registration_to)} onChange={handleChange} required />
      </div>
    </div>
  )

  const formatDateTime = (expectedDate) => {
    const now = new Date(expectedDate);
    if(expectedDate !== '') {
      const utcString = now.toISOString().substring(0,19);
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const day = now.getDate();
      const hour = now.getHours();
      const minute = now.getMinutes();
      const localDatetime = year + "-" +
                        (month < 10 ? "0" + month.toString() : month) + "-" +
                        (day < 10 ? "0" + day.toString() : day) + "T" +
                        (hour < 10 ? "0" + hour.toString() : hour) + ":" +
                        (minute < 10 ? "0" + minute.toString() : minute) +
                        utcString.substring(16,19)
      return localDatetime;
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const eventDate = new Date(eventData.date);
    const regStartDate = new Date(eventData.registration_from);
    const regEndDate = new Date(eventData.registration_to);

    setError('');
    if (eventData.paid && eventData.cost <= 0) {
      return setError('You need to set a price for a paid event')
    } else if (regStartDate > regEndDate) {
      return setError('Registration start date cannot be greater than the end date')
    } else if (eventDate < regEndDate) {
      return setError('Date of the event must come after registration end date')
    }

    const url = `/events/${eventData.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(eventData)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        setEvents(response);
        setLoading(false);
      })
      .catch(() => props.history.push("/"))
  }

  return loading ? <Loader /> : (
    <div className="vw-100 vh-100 primary-color container">
      <h3 className="mt-3 header-text">Edit Event</h3>
      <span style={{ color: 'red' }}><em>{error}</em></span>
      <form onSubmit={handleSubmit}>
        <div className="form-row mt-3 mb-3">
          <div className="col">
            <label htmlFor="name">Name *</label>
            <input type="text" className="form-control" id="name" placeholder="Enter name" onChange={handleChange} value={eventData.name} pattern="[A-Za-z0-9\s]+" minLength="2" autoFocus required />
          </div>
          <div className="col">
            <label htmlFor="date">Date *</label>
            <input type="datetime-local" className="form-control" id="date" placeholder="Date" value={formatDateTime(eventData.date)} onChange={handleChange} required />
          </div>
        </div>
        <div class="form-group">
          <label for="description">Description *</label>
          <textarea class="form-control" id="description" rows="5" onChange={handleChange} value={eventData.description} required ></textarea>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="active" onChange={handleActiveCheckedChange} checked={eventData.active} />
          <label className="form-check-label" htmlFor="active">Active</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="paid" onChange={handlePaidCheckedChange} checked={eventData.paid} />
          <label className="form-check-label" htmlFor="paid">Paid</label>
        </div>
        {eventData.paid && renderPrice()}
        {eventData.active && renderRegistrationDate()}
        <div>
          <button type="submit" className="btn btn-primary">Update</button>
        </div>
      </form>
    </div>
  )
}

export default EditEvent;