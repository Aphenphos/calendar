import { useEffect, useState } from 'react';
import { getCalendars } from '../services/owners';

export function useCalendars() {
  const [calendars, setCalendars] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCalendars();
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        arr.push({
          id: data[i].id,
          name: data[i].name,
        });
      }
      setCalendars(arr);
    };
    fetchData();
  }, []);
  return { calendars, setCalendars };
}
