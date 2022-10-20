import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/useUser';
import { Redirect } from 'react-router-dom';
import { useMonth } from '../../hooks/useMonth';
import Day from '../Day/Day';
import './Calendar.sass';
import { useCalendars } from '../../hooks/useCalendars';
import { useEvents } from '../../hooks/useEvents';

export default function Calender() {
  const curYear = new Date().getFullYear();
  const [year, setYear] = useState(curYear);
  const [month, setMonth] = useState(new Date().getMonth());
  const { user } = useContext(UserContext);
  const { calendars } = useCalendars();
  const [selected, setSelected] = useState(null);
  const { days } = useMonth(year, month, selected);
  const { events } = useEvents(selected);
  if (!events[0] && !days[0]) {
    return <p>loading</p>;
  }

  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }
  return (
    <>
      <select onChange={(e) => setSelected(e.target.value)}>
        <option defaultValue={null}>Pick your Calendar</option>
        {calendars.map((cal) => (
          <option key={cal.calId} value={cal.calId}>
            {cal.calName}
          </option>
        ))}
      </select>
      <select defaultValue={month} onChange={(e) => setMonth(e.target.value)}>
        <option selected disabled hidden>
          Months...
        </option>
        <option value={0}>January</option>
        <option value={1}>February</option>
        <option value={2}>March</option>
        <option value={3}>April</option>
        <option value={4}>May</option>
        <option value={5}>June</option>
        <option value={6}>July</option>
        <option value={7}>August</option>
        <option value={8}>September</option>
        <option value={9}>October</option>
        <option value={10}>November</option>
        <option value={11}>December</option>
      </select>
      <input defaultValue={year} type="number" onChange={(e) => setYear(e.target.value)}></input>
      <div id="month-container">
        <div className="days">Sunday</div>
        <div className="days">Monday</div>
        <div className="days">Tuesday</div>
        <div className="days">Wednesday</div>
        <div className="days">Thursday</div>
        <div className="days">Friday</div>
        <div className="days">Saturday</div>
        {days.map((d, index) => (
          <Day key={index} day={d.day} event={d.event} />
        ))}
      </div>
    </>
  );
}
