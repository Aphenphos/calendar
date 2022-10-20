import { client, checkError } from './client';

export function getUser() {
  return client.auth.currentUser;
}

export async function authUser(email, password, type) {
  let response;
  if (type === 'sign-up') {
    response = await client.auth.signUp({ email, password });
  } else {
    response = await client.auth.signIn({ email, password });
  }

  return response.user;
}

export async function signOut() {
  await client.auth.signOut();
}

export async function getProfileData() {
  const user = await getUser();
  const response = await client.from('user_profiles').select('*').eq('user_id', user.id).single();

  return checkError(response);
}

export async function updateProfile(profile) {
  const response = await client.from('user_profiles').upsert(profile).single();
  console.log(response.data);
  return response.data;
}
