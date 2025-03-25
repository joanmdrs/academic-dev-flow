import React from "react";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import { MembroProvider } from "../../context/MembroContexto";
import Equipe from "./Equipe";
import CustomBreadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
const {Content} = Layout

const ScreenEquipe = ({grupo}) => {
    const breadcrumbRoutes = [
        { title: 'Home', path: `/${grupo}/home` },
        { title: 'Membros', path: `/${grupo}/membros` },
        { title: 'Equipe', path: ``}
    ];
    return (
        <React.Fragment>
            { grupo === 'aluno' && <MenuAluno />}
            { grupo === 'professor' && <MenuProfessor />}

            <Layout>
                <MyHeader/>
                {/* <CustomBreadcrumb routes={breadcrumbRoutes} /> */}
                <Content>
                    <MembroProvider>
                        <Equipe grupo={grupo}/>
                    </MembroProvider>
                                           
                </Content>
            </Layout>
        </React.Fragment>   
    )
}

export default ScreenEquipe