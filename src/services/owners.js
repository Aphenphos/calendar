import { getProfileData } from './auth';
import { checkError, client } from './client';

export async function getCalendars() {
  const profile = await getProfileData();
  const response = await client.from('calendars').select('*').eq('owner', profile.id);
  return response.data;
}

export async function getCalendar(name, owner) {
  const response = await client
    .from('calendars')
    .select('*')
    .eq('name', name)
    .eq('owner', owner)
    .single();
  return response.data;
}
export async function updateCalendar(calendar) {
  const response = await client.from('calendars').upsert(calendar).single();
  return response.data;
}

export async function updateUser(user) {
  const response = await client.from('owners').upsert(user).single();
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
