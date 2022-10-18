import React, { useContext, useState } from 'react';
import { signOut } from '../../../services/auth';
import { UserContext } from '../../../context/useUser';
import { Link } from 'react-router-dom';
import './Header.css';
import { useCalendars } from '../../../hooks/useCalendars';

export default function Header() {
  const [select, setSelected] = useState('');
  const { user, setUser } = useContext(UserContext);
  const { calendars } = useCalendars();
  console.log(calendars);

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <div className="Header">
      <select onChange={(e) => setSelected(e.target.value)}>
        {calendars.map((cal) => (
          <option key={cal.id} value={cal.id}>
            {cal.name}
          </option>
        ))}
      </select>
      <div className="middle-header">
        <h1>Calendar</h1>
        <Link className="profile-link" to="/">
          Home
        </Link>
        <Link className="profile-link" to="/create-event">
          Make Event
        </Link>
        <Link className="profile-link" to="/create-calendar">
          Make a new Calendar
        </Link>
        <Link className="profile-link" to="/profile">
          Profile Page
        </Link>
        {user && (
          <Link to="/auth/sign-in" className="nav-link">
            <p onClick={handleSignOut}>Logout</p>
          </Link>
        )}
      </div>
    </div>
  );
}
