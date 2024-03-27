import React from "react";
import { Layout } from 'antd';
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import MyHeader from "../../../../components/Header/Header";

const baseStyle = {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
}


const HomeAdministrador = () => {
    return (
        <React.Fragment>
            <MenuAdmin />
            <Layout>
                <MyHeader />
                <div style={{...baseStyle}}>
                    Página Inicial 
                </div>
            </Layout>
        </React.Fragment>
    )
}

export default HomeAdministrador;