import React, { useContext } from 'react';
import { signOut } from '../../../services/auth';
import { UserContext } from '../../../context/useUser';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <div className="Header">
      <div className="middle-header">
        <h1>Calendar</h1>
        {user && (
          <Link to="/auth/sign-in" className="nav-link">
            <p onClick={handleSignOut}>Logout</p>
          </Link>
        )}
        <Link className="profile-link" to="/profile">
          Profile Page
        </Link>
      </div>
    </div>
  );
}
