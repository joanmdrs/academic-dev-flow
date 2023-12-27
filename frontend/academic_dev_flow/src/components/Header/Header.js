import React from 'react';
import { Layout } from 'antd';
import logo_ufrn from "../../assets/logo-ufrn.png";
import './Header.css';

const { Header } = Layout;

const MyHeader = () => {
  return (
    <Header className="header">
      <div className='logo-ufrn'> 
        <img src={logo_ufrn} alt="Logo da UFRN" />
      </div>      
    </Header>
  );
};

export default MyHeader;

