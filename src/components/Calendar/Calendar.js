import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/useUser';
import { Redirect } from 'react-router-dom';
import { useMonth } from '../../hooks/useMonth';
import Day from '../Day/Day';
import './Calendar.sass';

export default function Calender() {
  const [year, setYear] = useState(2022);
  const [month, setMonth] = useState(11);
  const { user } = useContext(UserContext);
  const { days, setDays } = useMonth(year, month);
  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }

  return (
    <>
      <div id="month-container">
        <div>Sunday</div>
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
        {days.map((day, index) => (
          <Day key={index} day={day} />
        ))}
      </div>
    </>
  );
}
