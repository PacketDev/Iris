import {
  Button,
  FormContainer,
  InputContainer,
  InputField,
  InputLabel,
} from '../../styles/styles';
import styles from './main.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { avatarEndpoint } from '../../utils/API';
import { Buffer } from 'buffer';

export const AvatarForm = () => {
  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions: object = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  useEffect(() => {
    if (!localStorage.getItem('iris-app')) navigate('/login');
  }, []);

  const skip = () => {
    return navigate('/guilds');
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error('Please select an avatar', toastOptions);
    } else {
      const user = JSON.parse(localStorage.getItem('iris-app') || '{}');

      const { data } = await axios.post(`${avatarEndpoint}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem('iris-app', JSON.stringify(user));
        navigate('/');
      } else {
        toast.error('Error setting avatar. Please try again.', toastOptions);
      }
    }
  };

  async function getData() {
    const data: any = [];
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString('base64'));
    }
    setAvatars(data);
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {isLoading ? (
        <FormContainer>loading...</FormContainer>
      ) : (
        <FormContainer>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index: any) => {
              return (
                <div
                  className={`avatar ${
                    selectedAvatar === index ? 'selected' : ''
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <Button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </Button>
          <Button onClick={skip}>Skip this.</Button>
          <ToastContainer />
        </FormContainer>
      )}
    </>
  );
};
