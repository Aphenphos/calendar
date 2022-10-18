import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../context/useUser';
import { useCalendars } from '../hooks/useCalendars';
import { getProfileData, getUser } from '../services/auth';
import {
  getCalendar,
  getCalendars,
  getUserByUserName,
  updateCalendar,
  updateUser,
} from '../services/owners';

export default function CreateCalendar() {
  const [selected, setSelected] = useState('');
  const [calendarName, setCalendarName] = useState('');
  const [newUser, setNewUser] = useState('');
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);
  const { calendars } = useCalendars();

  if (!user) {
    return <Redirect to="/auth/sign-in"></Redirect>;
  }
  //add users to an existing calendar
  const handleAdd = async () => {
    const usersId = await getUserByUserName(newUser);
    const user = {
      owner_id: usersId,
      cal_id: selected,
    };
    updateUser(user);
  };
  //for submitting a NEW calendar
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newCal = {};
    const profile = await getProfileData();
    let cur = getCalendar(calendarName, profile.id);
    console.log(cur);
    if (cur !== null) {
      newCal = {
        id: cur.id,
        name: calendarName,
        owner: profile.id,
      };
    } else {
      newCal = {
        name: calendarName,
        owner: profile.id,
      };
    }
    await updateCalendar(newCal);
    const newC = await getCalendar(calendarName, profile.id);
    const updatedUser = {
      cal_id: newC,
      owner_id: profile.id,
    };
    await updateUser(updatedUser);
    window.location.replace('/');
  };

  return (
    <>
      <select onChange={(e) => setSelected(e.target.value)}>
        <option defaultValue={null}>pick to edit</option>
        {calendars.map((cal) => (
          <option key={cal.id} value={cal.id}>
            {cal.name}
          </option>
        ))}
      </select>
      <form className="create-calender-form" onSubmit={handleSubmit}>
        Name Calendar
        <input
          value={calendarName}
          placeholder="Calendar Name"
          type="text"
          onChange={(e) => {
            setCalendarName(e.target.value);
          }}
        ></input>
        <button>Submit</button>
      </form>
      <input
        placeholder="Users Name"
        type="text"
        onChange={(e) => {
          setNewUser(e.target.value);
        }}
      ></input>
      <button onClick={handleAdd}>Add User</button>
    </>
  );
}
