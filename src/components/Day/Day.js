import './Day.sass';

export default function Day({ day }) {
  if (day === ' ') {
    return <button className="hidden-button"></button>;
  }
  return (
    <div>
      <button className="day-button">{day}</button>
    </div>
  );
}
