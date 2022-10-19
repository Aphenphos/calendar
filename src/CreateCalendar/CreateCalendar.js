import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../context/useUser';
import { useOwned } from '../hooks/useOwned';
import { useUsers } from '../hooks/useUsers';
import { getProfileData } from '../services/auth';
import {
  deleteCalendar,
  getCalendarByName,
  getUserByUserName,
  removeUser,
  updateCalendar,
  updateUser,
} from '../services/owners';
import './CreateCalendar.css';

export default function CreateCalendar() {
  const [selected, setSelected] = useState('');
  const [calendarName, setCalendarName] = useState('');
  const [newUser, setNewUser] = useState('');
  const { user } = useContext(UserContext);
  const { calendars, setCalendars } = useOwned();
  const { users, setUsers } = useUsers(selected);
  console.log(users);
  if (!user) {
    return <Redirect to="/auth/sign-in"></Redirect>;
  }
  //add users to an existing calendar
  const handleAdd = async () => {
    const usersId = await getUserByUserName(newUser);
    let user = {
      owner_id: usersId,
      cal_id: selected,
    };
    await updateUser(user);
    user = {
      prof_name: newUser,
      owner_id: usersId,
      cal_id: selected,
    };
    if (users === undefined || null) {
      setUsers([user]);
    } else {
      setUsers([user, ...users]);
    }
  };
  //for submitting a NEW calendar
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newCal = {};
    const profile = await getProfileData();
    let cur = await getCalendarByName(calendarName, profile.id);
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
    const newC = await getCalendarByName(calendarName, profile.id);
    const updatedUser = {
      cal_id: newC.id,
      owner_id: profile.id,
    };
    await updateUser(updatedUser);
    window.location.replace('/');
  };

  const removeU = async (e, index) => {
    await removeUser(e, selected);
    users.splice(index, 1);
    if (users === undefined || null) {
      setUsers([]);
    }
    setUsers(...users);
  };

  const deleteCal = async () => {
    if (confirm('Are you sure you want to delete this calendar?') === true) {
      await deleteCalendar(selected);
      window.location.replace('/');
    } else {
      return;
    }
  };

  return (
    <>
      <div className='create-calendar-page'>
        {calendars && (
          <>
            <select onChange={(e) => setSelected(e.target.value)}>
              <option defaultValue={null}>pick to edit</option>
              {calendars.map((cal) => (
                <option key={cal.id} value={cal.id}>
                  {cal.name}
                </option>
              ))}
            </select>
            <button value={selected} onClick={(e) => deleteCal(e.target.value)}>
            Delete Calendar
            </button>
          </>
        )}

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
        {users && (
          <div id="users">
            {users.map((u, index) => (
              <div key={u.owner_id}>
                <h3>{u.prof_name}</h3>
                <button value={u.owner_id} onClick={(e) => removeU(e.target.value, index)}>
                Remove User
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
