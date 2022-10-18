import { useEffect, useState } from 'react';
import { getAccess, getCalendarById } from '../services/owners';

export function useCalendars() {
  const [calendars, setCalendars] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const getCals = await getAccess();
      let getAccessible = [];
      for (let i = 0; i < getCals.length; i++) {
        getAccessible.push(getCals[i].cal_id);
      }
      let data = [];
      for (let i = 0; i < getAccessible.length; i++) {
        data.push(await getCalendarById(getAccessible[i]));
      }
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        arr.push({
          id: data[i][0].id,
          name: data[i][0].name,
        });
      }
      setCalendars(arr);
    };
    fetchData();
  }, []);
  return { calendars, setCalendars };
}
