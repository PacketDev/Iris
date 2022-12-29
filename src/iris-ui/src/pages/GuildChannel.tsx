import { useSearchParams } from 'react-router-dom';
import { GuildChannelStyle } from '../styles/styles';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const GuildChannel = () => {
  console.log(useSearchParams());

  return <GuildChannelStyle>Guild Channel</GuildChannelStyle>;
};
