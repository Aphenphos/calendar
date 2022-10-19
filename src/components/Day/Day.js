import './Day.sass';

export default function Day({ day, desc }) {
  if (day === ' ') {
    return <button className="hidden-button"></button>;
  }
  return (
    <div>
      <button className="day-button">
        {day}
        {desc.map((event, index) => (
          <p key={index}>{event.description}</p>
        ))}
      </button>
    </div>
  );
}
