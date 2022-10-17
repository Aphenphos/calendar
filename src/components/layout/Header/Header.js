import React, { useContext } from 'react';
import { signOut } from '../../../services/auth';
import { UserContext } from '../../context/useUser';
import { Link } from 'react-router-dom';
import './Header.css';


export default function Header() {
  const { user, setUser } = useContext(UserContext);
    
  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };
    
  return (
    <div className='Header'>
      <div className='middle-header'>
        <div className='img-container'>
          <h1>Hello!</h1>         
        </div>
        <Link to='/profile'>Profile Page</Link>
        {user && (
          <Link to="/auth/sign-in" className="nav-link">
            <p onClick={handleSignOut}>Logout</p>
          </Link>
        )}
      </div>
    </div>
      
  );
}
