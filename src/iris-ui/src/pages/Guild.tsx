import { Outlet, useParams } from "react-router-dom";
import { GuildPanel } from "../components/guilds/GuildPanel";
import { GuildSidebar } from "../components/guilds/GuildSidebar";
import { Page } from "../styles/styles";
import guilds from "../_tests_/guilds";

export const Guild = () => {
    const { id } = useParams();


    return (
        <Page>
            <GuildSidebar guilds={guilds} />
            {!id && <GuildPanel />}
            <Outlet />
        </Page>
    );
}