import React, { useState } from 'react';
import { getProfileData } from '../services/auth';



export default function CreateCalendar() {
  const [calendarName, setCalendarName] = useState('');
  const [firstUser, setFirstUser] = useState('');
  const [secondUser, setSecondUser] = useState('');
    
  
    
  async function handleSubmit() {
    const profile = await getProfileData();
    const newUsers = {
      name: calendarName,
      user1: profile.profile_name,
      user2: firstUser,
      user3: secondUser,
    };
  }
        
    
    
  return (
  
    <form className='create-calender-form'>      
          Name your calender!<input type="text"
        onChange={(e) => {
          setCalendarName(e.target.value);
        }}></input>       
          First User<input type="text"
        onChange={(e) => {
          setFirstUser(e.target.value);
        }}></input> 
          Second User<input type="text"
        onChange={(e) => {
          setSecondUser(e.target.value);
        }}></input>
      <button onClick={handleSubmit}>Make Calendar</button>
    </form>
  );
}
