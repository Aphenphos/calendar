import React, { useContext } from 'react';
import { signOut } from '../../../services/auth';
import { UserContext } from '../../context/useUser';
import { Link } from 'react-router-dom';

export default function Header() {
  const { user, setUser } = useContext(UserContext);
    
  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };
    
  return (
    <div>Header
          
      {user && (
        <Link to="/auth/sign-in" className="nav-link">
          <p onClick={handleSignOut}>Logout</p>
        </Link>
      )}

    </div>
      
  );
}
