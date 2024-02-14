import React from "react";
import MyHeader from "../../../components/Header/Header";
import StudentMenu from "../../../components/Menus/StudentMenu/StudentMenu";
import { Layout } from "antd";

const StudentDashboard = () => {

    return (

        <React.Fragment>
            <StudentMenu />
            <Layout>
                <MyHeader />
                <div className="student-dashboard-home">
                    Página Inicial 
                </div>
            </Layout>
        </React.Fragment>
    )
}

export default StudentDashboard