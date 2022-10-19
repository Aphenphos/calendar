import { useState } from 'react';
import { deleteEvent } from '../../services/events';
import './Day.sass';

export default function Day({ day, desc }) {
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
        {desc.map((event, index) => (
          <>
            <div key={index} className={active ? 'hidden' : ''}>
              <p>{event.description}</p>
              <button
                id={index}
                value={event.id}
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
