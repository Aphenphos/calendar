import { client, checkError } from './client';

export async function addDate(dateArr) {
  const response = await client.from('calendar-events').upsert(dateArr);
  return response.data;
}