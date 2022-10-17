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

export async function getCalendar(name, user1) {
  const response = await client
    .from('owners')
    .select('*')
    .eq('name', name)
    .eq('user1', user1)
    .single();
  console.log(response.data);
  return response.data;
}
export async function updateCalendar(calendar) {
  const response = await client.from('owners').upsert(calendar).single();
  return response.data;
}

export async function getUserByUserName(username) {
  const response = await client
    .from('user-profiles')
    .select('*')
    .eq('profile_name', username)
    .single();
  if (username === null) return response.data;
  return response.data.id;
}
