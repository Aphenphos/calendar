import React, { useContext, useEffect, useState } from 'react';
import { getProfileData, updateProfile } from '../../services/auth';
import { UserContext } from '../../context/useUser';

export default function Profile() {
  const [profile, setProfile] = useState([]);
  const [userName, setUserName] = useState(profile.profile_name);
  const { user } = useContext(UserContext);
  useEffect(() => {
    async function fetchProfile() {
      const data = await getProfileData();
      setProfile(data);
    }
    fetchProfile();
  }, []);

  const updateProf = async (e) => {
    e.preventDefault();
    const profileInput = {
      id: profile.id,
      profile_name: userName,
      user_id: user.id,
    };

    await updateProfile(profileInput);
    window.location.href = '/';
  };

  return (
    <>
      <h1>Profile Page</h1>
      <div>
        <h3>{profile.profile_name}</h3>
        <form onSubmit={updateProf}>
          <input
            type="text"
            name="username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <button> Submit </button>
        </form>
      </div>
    </>
  );
}
