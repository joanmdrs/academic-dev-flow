import React from "react";
import { Layout } from "antd";
import MenuAdmin from "../../../components/Menus/MenuAdmin/MenuAdmin";
import MyHeader from "../../../components/Header/Header";
import HomeAdmin from "./HomeAdmin";


const ScreenHomeAdmin = () => {

    return (

        <React.Fragment>
            <MenuAdmin />
            <Layout>
                <MyHeader />
                <HomeAdmin />
            </Layout>
        </React.Fragment>
    )
}

export default ScreenHomeAdmin