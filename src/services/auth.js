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
  const response = await client
    .from('user-profiles')
    .select('*');
    
  return checkError(response);
}
