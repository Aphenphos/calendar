import { useEffect, useState } from 'react';
import { getAccess } from '../services/owners';

export function useCalendars() {
  const [calendars, setCalendars] = useState([]);
  const [calLoading, setCalLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setCalLoading(true);
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
      setCalendars(arr);
    };
    fetchData();
    setCalLoading(false);
  }, []);
  return { calendars, setCalendars, calLoading, setCalLoading };
}
