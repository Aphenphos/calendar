import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../context/useUser';
import { getProfileData } from '../services/auth';
import { getCalendar, getCalendars, getUserByUserName, updateCalendar } from '../services/owners';

export default function CreateCalendar() {
  const [calendarName, setCalendarName] = useState('');
  const [firstUser, setFirstUser] = useState(null);
  const [secondUser, setSecondUser] = useState(null);
  const { user } = useContext(UserContext);

  if (!user) {
    return <Redirect to="/auth/sign-in"></Redirect>;
  }

  const handleSubmit = async (e) => {
    let newUsers = {};
    e.preventDefault();
    const profile = await getProfileData();
    const cur = await getCalendar(calendarName, profile.id);
    if (cur === null) {
      newUsers = {
        name: calendarName,
        user1: profile.id,
        user2: await getUserByUserName(firstUser),
        user3: await getUserByUserName(secondUser),
      };
      await updateCalendar(newUsers);
    } else {
      newUsers = {
        id: cur.id,
        name: calendarName,
        user1: profile.id,
        user2: await getUserByUserName(firstUser),
        user3: await getUserByUserName(secondUser),
      };
      await updateCalendar(newUsers);
    }
  };

  return (
    <form className="create-calender-form" onSubmit={handleSubmit}>
      Name your calender!
      <input
        type="text"
        onChange={(e) => {
          setCalendarName(e.target.value);
        }}
      ></input>
      First User
      <input
        type="text"
        onChange={(e) => {
          setFirstUser(e.target.value);
        }}
      ></input>
      Second User
      <input
        type="text"
        onChange={(e) => {
          setSecondUser(e.target.value);
        }}
      ></input>
      <button>Make Calendar</button>
    </form>
  );
}
