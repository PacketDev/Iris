import { Outlet, useParams } from 'react-router-dom';
import { GuildPanel } from '../components/guilds/GuildPanel';
import { GuildSidebar } from '../components/guilds/GuildSidebar';
import { Page } from '../styles/styles';
import guilds from '../_tests_/guilds';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Guild = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  return (
    <Page>
      <GuildSidebar guilds={guilds} />
      {!id && <GuildPanel />}
      <Outlet />
    </Page>
  );
};
