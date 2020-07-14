import React from 'react';
import EventCard from '../EventCard';

const EventCardList = ({ events }) => (
  <div className="row row-cols-1 row-cols-md-4">
    {
      events.map((event, i) => {
        return <EventCard
          name={event.name}
          key={i}
          date={event.date}
          paid={event.paid}
          cost={event.cost}
          active={event.active}
          regActiveFrom={event.registration_from}
          regActiveTo={event.registration_to}
        />
      })
    }
  </div>
)

export default EventCardList;