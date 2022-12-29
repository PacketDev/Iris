import { useSearchParams } from 'react-router-dom';
import { GuildChannelStyle, GuildChannelNavbarStyle } from '../styles/styles';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const GuildChannel = () => {
  return (
    <GuildChannelStyle>
      <GuildChannelNavbarStyle>Users</GuildChannelNavbarStyle>
    </GuildChannelStyle>
  );
};
