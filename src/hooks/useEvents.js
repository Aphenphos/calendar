import { useEffect, useState } from 'react';
import { getEvents } from '../services/events';
import { parseDates } from '../services/utils';

export function useEvents(calId) {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getEvents(calId);
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        const parsed = await parseDates(data[i].date);
        arr.push({
          id: data[i].id,
          description: data[i].description,
          date: parsed,
        });
      }
      console.log(arr);
      setEvents(arr);
    };
    fetchData();
  }, [calId]);
  return { events, setEvents };
}
