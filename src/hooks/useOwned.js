import { useEffect, useState } from 'react';
import { getOwnedCalendars } from '../services/owners';

export function useOwned() {
  const [calendars, setCalendars] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getOwnedCalendars();
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        arr.push({
          id: data[i].id,
          name: data[i].name,
        });
      }
      setCalendars(arr);
    }
    fetchData();
  }, []);
  return { calendars, setCalendars };
}
