import React, { useContext } from 'react';
import { signOut } from '../../../services/auth';
import { UserContext } from '../../../context/useUser';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const { user, setUser, setProfile } = useContext(UserContext);

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
    setProfile(null);
  };

  return (
    <div className="Header">
      <div className="middle-header">
        <h1>YouCal</h1>
        <Link className="profile-link" to="/">
          Home
        </Link>
        <Link className="profile-link" to="/create-event">
          Events
        </Link>
        <Link className="profile-link" to="/choose-calendar">
          Customize and Create
        </Link>
        <Link className="profile-link" to="/profile">
          Profile
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
