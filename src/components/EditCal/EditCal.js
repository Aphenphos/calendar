import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/useUser';
import { useOwned } from '../../hooks/useOwned';
import { useUsers } from '../../hooks/useUsers';

import { deleteCalendar, getUserByUserName, removeUser, updateUser } from '../../services/owners';
import './EditCal.css';

export default function EditCal() {
  const [selected, setSelected] = useState('');

  const [newUser, setNewUser] = useState('');
  const { user, loading, profile } = useContext(UserContext);
  const { calendars } = useOwned();
  const { users, setUsers } = useUsers(selected);
  if (loading) {
    return <p>loading</p>;
  }

  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }

  if (!profile) {
    return <Redirect to="/profile" />;
  }
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
      <div className="create-calendar-page">
        <div className="form-input">
          {calendars && (
            <>
              <select onChange={(e) => setSelected(e.target.value)}>
                <option defaultValue={null}>Edit a Calendar</option>
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
      </div>
    </>
  );
}
