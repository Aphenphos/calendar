import { useState } from 'react';
import { deleteEvent } from '../../services/events';
import './Day.sass';

export default function Day({ day, event }) {
  const [active, setActive] = useState([]);
  if (day === ' ') {
    return <button className="hidden-button"></button>;
  }

  const removeEvent = async (id, eve) => {
    setActive([eve, ...active]);
    await deleteEvent(id);
  };
  return (
    <>
      <div className="day-container">
        {day}
        {event.map((eve, index) => (
          <>
            <div key={index} className={`event-info ${active.includes(eve) && 'hidden'}`}>
              <p>{eve.description}</p>
              <button
                className="delete-button"
                id={index}
                value={eve.id}
                onClick={(e) => {
                  removeEvent(e.target.value, eve);
                }}
              >
                -
              </button>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
