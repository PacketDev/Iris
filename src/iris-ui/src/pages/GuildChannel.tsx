import { useParams } from "react-router-dom";
import { GuildChannelStyle } from "../styles/styles";
import { GuildPanel } from "../components/guilds/GuildPanel"

export const GuildChannel = () => {
    const { id } = useParams();

    console.log(id);

    return (
        <GuildChannelStyle>
            {!id && <GuildPanel />}
        </GuildChannelStyle>
    );
}