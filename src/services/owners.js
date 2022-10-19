import { getProfileData } from './auth';
import { client } from './client';

export async function getAccess() {
  const profile = await getProfileData();
  const response = await client
    .from('owners')
    .select(
      `
  id,
  cal_id,
  owner_id,
  calendars (
    id,
    name,
    owner
  )
  `
    )
    .eq('owner_id', profile.id);
  return response.data;
}

export async function getCalendarById(id) {
  const resp = await client.from('calendars').select('*').eq('id', id);
  return resp.data;
}

export async function getOwnedCalendars() {
  const profile = await getProfileData();
  const resp = await client.from('calendars').select('*').eq('owner', profile.id);
  console.log(resp.data);
  return resp.data;
}

export async function getCalendarByName(name, owner) {
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
    .from('user_profiles')
    .select('*')
    .eq('profile_name', username)
    .single();
  if (username === null) return response.data;
  return response.data.id;
}

export async function getUsers(calId) {
  const response = await client
    .from('owners')
    .select(
      `
  id,
  cal_id,
  owner_id,
  user_profiles (
    profile_name
  )
  `
    )
    .eq('cal_id', calId);
  return response.data;
}

export async function removeUser(id, calId) {
  const response = await client
    .from('owners')
    .delete()
    .eq('cal_id', calId)
    .eq('owner_id', id)
    .single();
  return response.data;
}

export async function deleteCalendar(calId) {
  const events = await client.from('calendar-events').delete().eq('calendar', calId);
  const owners = await client.from('owners').delete().eq('cal_id', calId);
  const cal = await client.from('calendars').delete().eq('id', calId);
  return events.data, owners.data, cal.data;
}
