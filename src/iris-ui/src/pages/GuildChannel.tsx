import { useSearchParams } from 'react-router-dom';
import { GuildChannelStyle } from '../styles/styles';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const GuildChannel = () => {
  console.log(useSearchParams());

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('iris-app') !== null) {
      return navigate('/register');
    }
  });

  return <GuildChannelStyle>Guild Channel</GuildChannelStyle>;
};
