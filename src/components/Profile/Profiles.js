import React, { useContext, useEffect, useState } from 'react';
import { getProfileData, updateProfile } from '../../services/auth';
import { UserContext } from '../../context/useUser';
import './profiles.css';
import { client } from '../../services/client';

export default function Profile() {
  const [profile, setProfile] = useState([]);
  const [image, setImage] = useState('null');
  const [message, setMessage] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
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
    let avatarUrl = '';

    if (image) {
      const { data, error } = await client
        .storage.from('avatars')
        .upload(`${Date.now()}_${image.name}`, image);
      if (error) {
        console.log(error);
      }
      if (data) {
        setAvatarUrl(data.key);
        avatarUrl = data.key;
      }
      
    }

    const { data, error } = await client
      .from('user-profiles')
      .upsert({
        id: profile.id,
        profile_name: userName,
        user_id: user.id,
        avatar_url: avatarUrl,
      });
      
    if (error) {
      console.log(error);
    }

    if (data) {
      setMessage('Profile Updated');
    }
    

    const profileInput = {
      id: profile.id,
      profile_name: userName,
      user_id: user.id,
    };

    await updateProfile(profileInput);
    window.location.href = '/';
  };

  return (
    <div className='profile-page'>
      {message && message}
      {avatarUrl ? <img src={`https://cpacsftmlinqqlebpokj.supabase.co/storage/v1/object/public/${avatarUrl}`} width={150} alt=''/> : 'No avatar'}
      <div>
        <form onSubmit={updateProf}>
          <div className='avatar'>
            <label htmlFor='avatar'>Upload Avatar: </label>
            <input 
              type='file' 
              accept='{image/jpeg image/png}'
              onChange={e => setImage(e.target.files[0])}  
            />
          </div>
        </form>
        <h3>{profile.profile_name}</h3>
        <form onSubmit={updateProf}>
          <input
            type="text"
            name="username"
            placeholder='enter profile name'
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <button> Submit </button>
        </form>
      </div>
    </div>
  );
}
