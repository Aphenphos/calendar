import React, { useContext, useEffect, useState } from 'react';
import { getProfileData, updateProfile } from '../../services/auth';
import { UserContext } from '../../context/useUser';
import { Redirect } from 'react-router-dom';
import './profiles.css';

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

    const resp = await updateProfile(profileInput);
    if (resp === null) {
      window.alert('This username is taken');
    } else {
      window.location.href = '/';
    }
  };

  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }

  return (
    <>
      <div className="profile-page">
        <h2>Profile Page</h2>
        <h3>UserName: {profile.profile_name}</h3>
        <form onSubmit={updateProf}>
          <input
            type="text"
            name="username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <br></br>
          <button className="submit-button"> Submit </button>
        </form>
      </div>
    </>
  );
}
