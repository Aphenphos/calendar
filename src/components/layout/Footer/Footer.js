import React from 'react';
import useTime from '../../../hooks/useTime';
import './Footer.css';

export default function Footer() {
  const time = useTime();

  return (
    <div className='Footer'>
      <h3>{time}</h3>
    </div>
  );
}
