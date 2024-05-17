import React, { isValidElement } from 'react';
import { Button, Layout } from 'antd';
import logo_ufrn from "../../assets/logo-ufrn.png";
import './Header.css';
import MyDropdown from '../Dropdown/Dropdown';
import { useAuth } from '../../hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useContextoGlobalProjeto } from '../../context/ContextoGlobalProjeto';
import { CiUser } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";

const { Header } = Layout;


const MyHeader = () => {

    const {logOut} = useAuth();
    const navigate = useNavigate()
    const {grupo} = useContextoGlobalProjeto()


    const handleAcessarPerfil = async () => {

        if (grupo === 'Docentes') {
            navigate("/professor/perfil")
        } else if (grupo === 'Discentes') {
            navigate("/aluno/perfil")
        } else if (grupo === 'Administradores') {
            navigate("/admin/perfil")
        }
    }

    
    const items = [
        {
            label: (
                <Button style={{border: "none"}} onClick={() => handleAcessarPerfil()}> 
                    Perfil
                </Button>
            ),
            key: '1',
            icon: <CiUser size="15px" />
        },
        {
            label: (
                <Button style={{border: "none"}} onClick={() => logOut()}> 
                Logout
                </Button>
            ),
            key: '2',
            icon: <CiLogout size="15px"/>
        },
    ];

    return (
        <Header className="header">
        <div className='logo-ufrn'>
            <img src={logo_ufrn} alt="Logo da UFRN" className='logo-image' />
        </div>

        <div className='icone-perfil'>
            <MyDropdown items={items} />
        </div>
        </Header>
    );
};

export default MyHeader;
