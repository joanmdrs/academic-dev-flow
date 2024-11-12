import React from "react";
import MenuAdmin from "../../../../components/Menus/MenuAdmin/MenuAdmin";
import { Layout } from "antd";
import MyHeader from "../../../../components/Header/Header";
import { ProviderRelease } from "../../context/ContextoRelease";
import AdminReleases from "./AdminReleases";

const ScreenAdminReleases = () => {
    return (
        <React.Fragment>
            <MenuAdmin />
            <Layout>
                <MyHeader />
                <ProviderRelease>
                    <AdminReleases />
                </ProviderRelease>
            </Layout>
            
        </React.Fragment>
        
    )
}

export default ScreenAdminReleases