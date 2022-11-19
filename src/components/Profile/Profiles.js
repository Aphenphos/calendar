import React, { useContext, useState } from 'react';
import { updateProfile } from '../../services/auth';
import { UserContext } from '../../context/useUser';
import { Redirect } from 'react-router-dom';
import './profiles.css';

export default function Profile() {

  const { user, profile } = useContext(UserContext);
  const [userName, setUserName] = useState('');


  const updateProf = async (e) => {
    e.preventDefault();
    let profileInput = {};
    if (profile) {
      profileInput = {
        id: profile.id,
        profile_name: userName,
        user_id: user.id,
      };
    } else {
      profileInput = {
        profile_name: userName,
        user_id: user.id
      };
    }

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
        <h3>UserName: {profile ? profile.profile_name : ''}</h3>
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
