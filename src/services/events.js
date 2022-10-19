import { client } from './client';

export async function addDate(dateArr) {
  const response = await client.from('calendar-events').upsert(dateArr);
  return response.data;
}

export async function getEvents(calId) {
  const response = await client.from('calendar-events').select('*').eq('calendar', calId);
  return response.data;
}
