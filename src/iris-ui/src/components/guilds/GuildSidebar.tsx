import {
  GuildSidebarContainer,
  GuildSidebarItem,
  GuildSidebarStyle,
  GuildSidebarHeader,
} from '../../styles/styles';
import { GuildType } from '../../types';
import styles from './main.module.scss';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type Props = {
  guilds: GuildType[];
};

export const GuildSidebar: React.FC<Props> = ({ guilds }) => {
  const navigate = useNavigate();


  return (
    <GuildSidebarStyle>
      <GuildSidebarHeader>
        <h1>Guilds</h1>
      </GuildSidebarHeader>
      <GuildSidebarContainer>
        {guilds.map((guild) => (
          <GuildSidebarItem onClick={() => navigate(`/guilds/${guild.id}`)}>
            <div className={styles.guildAvatar}></div>
            <div>
              <span className={styles.guildName}>{guild.username}</span>
            </div>
          </GuildSidebarItem>
        ))}
      </GuildSidebarContainer>
    </GuildSidebarStyle>
  );
};
