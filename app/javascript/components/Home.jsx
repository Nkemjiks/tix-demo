import React, { useState, useEffect } from "react";
import Loader from './Loader';
import EventCardList from './EventCardList';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = "/events/all_events";
    fetch(url)
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
      .catch(() => this.props.history.push("/"));
  }, []);

  return (
    <div className="vw-100 vh-100 primary-color">
      <div className="bg-transparent">
        <div className="container-fluid secondary-color">
          <h3>All Events</h3>
            {
              loading ? <Loader /> : <EventCardList events={events} />
            }
        </div>
      </div>
    </div>
  )
};

export default Home;