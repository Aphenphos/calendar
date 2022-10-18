import { useEffect, useState } from 'react';
import { getAccess, getCalendarById } from '../services/owners';

export function useCalendars() {
  const [calendars, setCalendars] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAccess();
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        arr.push({
          id: data[i].id,
          cal_id: data[i].cal_id,
          owner_id: data[i].owner_id,
          calId: data[i].calendars.id,
          calName: data[i].calendars.name,
          calOwner: data[i].calendars.owner,
        });
      }
      console.log(arr);
      setCalendars(arr);
    };
    fetchData();
  }, []);
  return { calendars, setCalendars };
}
