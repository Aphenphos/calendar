import React from 'react';
import { Link } from 'react-router-dom';
import './ChooseCalender.css';

export default function ChooseCalender() {
  return (
    <div className='container-choose'>
          
      <button className='pick-button'><Link to="/edit-calendar">Edit Calendar</Link></button>
      <button className='pick-button'><Link to="/create-calendar">Create a Calendar</Link></button>
    </div>
  );
}
