import { Layout } from "antd";
import MenuAluno from "../components/Menus/MenuAluno/MenuAluno";
import MyHeader from "../components/Header/Header";

const AlunoLayout = ({ children }) => {
    return (
        <>
            <MenuAluno />
            <Layout>
                <MyHeader />
                {children}
            </Layout>
        </>
    );
};

export default AlunoLayout;