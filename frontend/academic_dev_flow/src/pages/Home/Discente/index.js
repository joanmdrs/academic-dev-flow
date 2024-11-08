import React from "react";
import { Layout } from "antd";
import HomeDiscente from "./HomeDiscente";
import MenuAluno from "../../../components/Menus/MenuAluno/MenuAluno";
import MyHeader from "../../../components/Header/Header";


const ScreenHomeDiscente = () => {

    return (

        <React.Fragment>
            <MenuAluno />
            <Layout>
                <MyHeader />
                <HomeDiscente />
            </Layout>
        </React.Fragment>
    )
}

export default ScreenHomeDiscente