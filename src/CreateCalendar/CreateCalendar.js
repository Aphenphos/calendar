import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../context/useUser';
import { useUsers } from '../hooks/useUsers';
import { getProfileData } from '../services/auth';
import { getCalendarByName, removeUser, updateCalendar, updateUser } from '../services/owners';
import './CreateCalendar.css';

export default function CreateCalendar() {
  const [selected] = useState('');
  const [loading, setLoading] = useState(false);
  const [calendarName, setCalendarName] = useState('');
  const { user, profile } = useContext(UserContext);
  const { users, setUsers } = useUsers(selected);
  if (!user) {
    return <Redirect to="/auth/sign-in"></Redirect>;
  }
  if (profile === null) {
    return <Redirect to="/profile"></Redirect>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    setLoading(false);
    window.location.replace('/edit-calendar');
  };

  const removeU = async (e, index) => {
    setLoading(true);
    await removeUser(e, selected);
    users.splice(index, 1);
    if (users === undefined || null) {
      setUsers([]);
    }
    setUsers(...users);
    setLoading(false);
  };
  if (loading) {
    return <p>loading</p>;
  }

  return (
    <>
      <div className="create-calendar-page">
        <form className="create-calender-form" onSubmit={handleSubmit}>
          Make a New Calendar!
          <input
            className="input-form-create"
            value={calendarName}
            placeholder="Calendar Name"
            type="text"
            onChange={(e) => {
              setCalendarName(e.target.value);
            }}
          ></input>
          <button>Make Calendar</button>
        </form>

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
