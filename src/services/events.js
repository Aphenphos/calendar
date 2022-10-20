import { client } from './client';

export async function addDate(dateArr) {
  const response = await client.from('calendar-events').upsert(dateArr);
  return response.data;
}

export async function getEvents(calId) {
  const response = await client.from('calendar-events').select('*').eq('calendar', calId);
  return response.data;
}

export async function deleteEvent(id) {
  const response = await client.from('calendar-events').delete().eq('id', id).single();
  return response.data;
}
