import { Layout } from "antd";
import MenuProfessor from "../components/Menus/MenuProfessor/MenuProfessor";
import MyHeader from "../components/Header/Header";

const ProfessorLayout = ({ children }) => {
    return (
        <>
            <MenuProfessor />
            <Layout>
                <MyHeader />
                {children}
            </Layout>
        </>
    );
};

export default ProfessorLayout;