import React from 'react';
import EventCard from '../EventCard';

const EventCardList = ({ events }) => (
  <div className="row row-cols-1 row-cols-md-4">
    {
      events.length > 0 ? events.map((eventData, i) => {
        return <EventCard eventData={eventData} key={i} />
      }) : <p className="text-center">You don't have any events</p>
    }
  </div>
)

export default EventCardList;