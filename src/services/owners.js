import { getProfileData } from './auth';
import { checkError, client } from './client';

export async function getCalendars() {
  const profile = getProfileData();
  const response = await client
    .from('owners')
    .select('*')
    .eq('user1, user2, user3', profile.profile_name);
  return checkError(response);
}

export async function updateCalendar(calendar) {
  const response = await client.from('owners').upsert(calendar).single();
  return response.data;
}
