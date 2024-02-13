import React, { isValidElement } from 'react';
import { Button, Layout } from 'antd';
import logo_ufrn from "../../assets/logo-ufrn.png";
import './Header.css';
import { SlLogout } from "react-icons/sl";
import MyDropdown from '../Dropdown/Dropdown';
import { useAuth } from '../../hooks/AuthProvider';

const { Header } = Layout;


const MyHeader = () => {

  const {logOut} = useAuth();

  
  const items = [
    {
      label: (
        <Button style={{border: "none"}} onClick={() => logOut()}> 
          Logout
        </Button>
      ),
      key: '1',
      icon: <SlLogout />,
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
