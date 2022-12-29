import { useEffect } from 'react';
import { GuildChannelStyle } from '../../styles/styles';
import { Overlay } from '../Overlay';

export const GuildPanel = () => {
  return (
    <GuildChannelStyle>
      <Overlay></Overlay>
    </GuildChannelStyle>
  );
};
