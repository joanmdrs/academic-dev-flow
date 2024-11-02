import React from 'react';
import { Button, Layout } from 'antd';
import logo_ufrn from "../../assets/logo-ufrn.png";
import './Header.css';
import MyDropdown from '../Dropdown/Dropdown';
import { useAuth } from '../../hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { CiUser, CiLogout} from "react-icons/ci";
import { useContextoGlobalProjeto } from '../../context/ContextoGlobalProjeto/ContextoGlobalProjeto';
import { useContextoGlobalUser } from '../../context/ContextoGlobalUser/ContextoGlobalUser';
import { useContextoGlobalTheme } from '../../context/ContextoTheme/ContextoTheme';
import { FaBrush } from "react-icons/fa6";

const { Header } = Layout;

const MyHeader = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    const { grupo } = useContextoGlobalProjeto();
    const { usuario } = useContextoGlobalUser();
    const { theme, setTheme } = useContextoGlobalTheme();

    const handleAcessarPerfil = async () => {
        if (grupo === 'Docentes') {
            navigate("/professor/perfil");
        } else if (grupo === 'Discentes') {
            navigate("/aluno/perfil");
        } else if (grupo === 'Administradores') {
            navigate("/admin/perfil");
        }
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const items = [
        {
            label: (
                <Button style={{ border: "none" }} onClick={handleAcessarPerfil}> 
                    Perfil
                </Button>
            ),
            key: '1',
            icon: <CiUser size="15px" />
        },
        {
            label: (
                <Button style={{ border: "none" }} onClick={logOut}> 
                    Logout
                </Button>
            ),
            key: '2',
            icon: <CiLogout size="15px"/>
        },
    ];

    return (
        <Header 
            className="header" 
            style={{
                backgroundColor: theme === 'light' ? '#FFFFFF' : '#001529',
                color: theme === 'light' ? '#000000' : '#FFFFFF',
                borderBottom: '1px solid #ddd'
            }}> 
            <div className='logo-ufrn'>
                <img src={logo_ufrn} alt="Logo da UFRN" className='logo-image' />
            </div>

            <div style={{display:'flex', gap: '20px'}}>
                <Button 
                    onClick={toggleTheme} 
                    icon={<FaBrush color={`${theme === 'light' ? "#000000" : '#FFFFFF'}`}/>}
                    style={{
                        borderRadius: '50%', 
                        background: 'none', 
                        border: `1px solid ${theme === 'light' ? "#000000" : '#FFFFFF'}`, 
                        cursor: 'pointer' 
                    }}
                />
                <div className='icone-perfil'>
                    <MyDropdown items={items} />
                </div>
            </div>
        </Header>
    );
};

export default MyHeader;
