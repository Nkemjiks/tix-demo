import React, { useState } from 'react';

const CreateEvent = (props) => {
  const initialEvent = {
    name: '',
    paid: false,
    cost: 0,
    active: false,
    registration_from: '',
    registration_to: '',
    date: ''
  }
  const [newEvent, setNewEvent] = useState(initialEvent);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setNewEvent({
      ...newEvent,
      [event.target.id] : event.target.value
    })
  }

  const handlePaidCheckedChange = (event) => {
    if(event.target.id === 'paid' && !event.target.checked) {
      setNewEvent({
        ...newEvent,
        [event.target.id] : event.target.checked,
        cost: 0,
      })
    } else {
      setNewEvent({
        ...newEvent,
        [event.target.id] : event.target.checked
      })
    }
  }

  const handleActiveCheckedChange = (event) => {
    if(event.target.id === 'active' && !event.target.checked) {
      setNewEvent({
        ...newEvent,
        [event.target.id] : event.target.checked,
        registration_from: '',
        registration_to: ''
      })
    } else {
      setNewEvent({
        ...newEvent,
        [event.target.id] : event.target.checked
      })
    }
  }

  const renderPrice = () => (
    <div className="form-row mt-3 mb-3">
      <div className="col">
        <label htmlFor="cost">Price *</label>
        <input type="number" className="form-control" id="cost" placeholder="1000" onChange={handleChange} required />
      </div>
    </div>
  )

  const renderRegistrationDate = () => (
    <div className="form-row mt-3 mb-3">
      <div className="col">
        <label htmlFor="registration_from">Registration Start date *</label>
        <input type="datetime-local" className="form-control" id="registration_from" placeholder="Start date" onChange={handleChange} required />
      </div>
      <div className="col">
        <label htmlFor="registration_to">Registration End date *</label>
        <input type="datetime-local" className="form-control" id="registration_to" placeholder="End date" onChange={handleChange} required />
      </div>
    </div>
  )

  const handleSubmit = (event) => {
    event.preventDefault();
    const eventDate = new Date(newEvent.date);
    const regStartDate = new Date(newEvent.registration_from);
    const regEndDate = new Date(newEvent.registration_to);

    setError('');
    if (newEvent.paid && newEvent.cost <= 0) {
      return setError('You need to set a price for a paid event')
    } else if (regStartDate > regEndDate) {
      return setError('Registration start date cannot be greater than the end date')
    } else if (eventDate < regEndDate) {
      return setError('Date of the event must come after registration end date')
    }

    const url = "/events";
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newEvent)
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

  return (
    <div className="vw-100 vh-100 primary-color container">
      <h3 className="mt-3 header-text">Create Event</h3>
      <span style={{ color: 'red' }}><em>{error}</em></span>
      <form onSubmit={handleSubmit}>
        <div className="form-row mt-3 mb-3">
          <div className="col">
            <label htmlFor="name">Name *</label>
            <input type="text" className="form-control" id="name" placeholder="Enter name" onChange={handleChange} pattern="[A-Za-z\s]+" minLength="2" autoFocus required />
          </div>
          <div className="col">
            <label htmlFor="date">Date *</label>
            <input type="datetime-local" className="form-control" id="date" placeholder="Date" onChange={handleChange} required />
          </div>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="active" onChange={handleActiveCheckedChange}/>
          <label className="form-check-label" htmlFor="active">Active</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="paid" onChange={handlePaidCheckedChange} />
          <label className="form-check-label" htmlFor="paid">Paid</label>
        </div>
        {newEvent.paid && renderPrice()}
        {newEvent.active && renderRegistrationDate()}
        <div>
          <button type="submit" className="btn btn-primary">Create</button>
        </div>
      </form>
    </div>
  )
}

export default CreateEvent;