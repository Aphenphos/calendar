import React, { useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { UserContext } from '../../context/useUser';
import './ChooseCalender.css';

export default function ChooseCalender() {
  const { user, loading, profile } = useContext(UserContext);
  if (loading) {
    return <p>loading</p>;
  }

  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }

  if (!profile) {
    return <Redirect to="/profile" />;
  }
  return (
    <div className='container-choose'>
          
      <button className='pick-button'><Link to="/edit-calendar">Edit Calendar</Link></button>
      <button className='pick-button'><Link to="/create-calendar">Create a Calendar</Link></button>
    </div>
  );
}
