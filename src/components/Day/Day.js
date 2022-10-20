import { useState } from 'react';
import { deleteEvent } from '../../services/events';
import './Day.sass';

export default function Day({ day, event }) {
  const [active, setActive] = useState(null);
  if (day === ' ') {
    return <button className="hidden-button"></button>;
  }

  const removeEvent = async (id) => {
    setActive(id);
    await deleteEvent(id);
  };
  return (
    <>
      <div>
        {day}
        {event.map((eve, index) => (
          <>
            <div key={index} className={active ? 'hidden' : ''}>
              <p>{eve.description}</p>
              <button
                id={index}
                value={eve.id}
                onClick={(e) => {
                  removeEvent(e.target.value);
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
