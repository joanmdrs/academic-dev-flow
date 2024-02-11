import React from "react";
import "./Home.css";
import { Layout } from 'antd';
import MyMenu from "../../components/Menu/Menu";
import MyHeader from "../../components/Header/Header";

const Home = () => {
    return (
        <React.Fragment>
            <MyMenu />
            <Layout>
                <MyHeader />
                <div className="pagina-home">
                    Página Inicial 
                </div>
            </Layout>
        </React.Fragment>
    )
}

export default Home;