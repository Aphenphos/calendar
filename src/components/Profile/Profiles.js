import React, { useEffect, useState } from 'react';
import { getProfileData } from '../../services/auth';

export default function Profile() {
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    async function fetchProfile() {
      const data = await getProfileData();
      setProfile(data);
    }
    fetchProfile();
  }, []);

  return (
    <>
      <h1>Profile Page</h1>
      <div>
        <h3>{profile.id}</h3>
        <h3>{profile.profile_name}</h3>             
        <h3>{profile.user_id}</h3>             
      </div>
    </>
  );
}