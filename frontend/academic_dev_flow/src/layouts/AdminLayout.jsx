import React from "react";
import { Layout } from "antd";
import MenuAdmin from "../components/Menus/MenuAdmin/MenuAdmin";
import MyHeader from "../components/Header/Header";

const AdminLayout = ({ children }) => {
    return (
        <>
            <MenuAdmin />
            <Layout>
                <MyHeader />
                {children}
            </Layout>
        </>
    );
};

export default AdminLayout;