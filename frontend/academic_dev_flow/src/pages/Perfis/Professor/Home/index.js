import React from "react";
import { Layout } from "antd";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import MyHeader from "../../../../components/Header/Header";

const baseStyle = {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
}

const HomeProfessor = () => {

    return (

        <React.Fragment>
            <MenuProfessor />
            <Layout>
                <MyHeader />
                <div style={{...baseStyle}}>
                    Página Inicial do Professor
                </div>
            </Layout>
        </React.Fragment>
    )
}

export default HomeProfessor