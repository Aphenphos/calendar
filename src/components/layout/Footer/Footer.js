import React, { useContext } from 'react';
import { ThemeContext } from '../../../context/useTheme';
import useTime from '../../../hooks/useTime';
import './Footer.css';

export default function Footer() {
  const time = useTime();
  const [{ isDark }, toggleTheme] = useContext(ThemeContext);

  return (
    <div className='Footer'>
      <h3>{time}</h3>
      <div className='theme-button'>{isDark ? 'Dark' : 'Light'}
        <button onClick={toggleTheme}>Mode</button>
      </div>
    </div>
  );
}
