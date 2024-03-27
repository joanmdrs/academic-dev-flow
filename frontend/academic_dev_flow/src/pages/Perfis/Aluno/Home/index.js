import React from "react";
import { Layout } from "antd";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MyHeader from "../../../../components/Header/Header";

const baseStyle = {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
}

const HomeAluno = () => {

    return (

        <React.Fragment>
            <MenuAluno />
            <Layout>
                <MyHeader />
                <div style={{...baseStyle}}>
                    Página Inicial do Aluno
                </div>
            </Layout>
        </React.Fragment>
    )
}

export default HomeAluno