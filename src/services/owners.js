import { getProfileData } from './auth';
import { client } from './client';

export async function getAccess() {
  const profile = await getProfileData();
  const response = await client.from('owners').select('*').eq('owner_id', profile.id);
  return response.data;
}

export async function getCalendars(id) {
  const resp = await client.from('calendars').select('*').eq('id', id);
  return resp.data;
}

export async function getOwnedCalendars() {
  const profile = await getProfileData();
  const resp = await client.from('calendars').select('*').eq('owner', profile.id);
  console.log(resp.data);
  return resp.data;
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
