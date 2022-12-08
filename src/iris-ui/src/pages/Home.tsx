import { Page } from "../styles/styles";
import { HomeForm } from "../components/forms/HomeForm";

export const Home = () => {
    return (
        <Page display="flex" justifyContent="center" alignItems="center">
            <HomeForm />
        </Page>
    );
}