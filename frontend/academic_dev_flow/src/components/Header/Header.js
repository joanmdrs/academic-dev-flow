import React from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import {FiMenu} from 'react-icons/fi';
import {CgMenuGridO} from 'react-icons/cg';
import logo_ufrn from "../../assets/logo-ufrn.png";
import './Header.css';

const { Header } = Layout;

const MyHeader = () => {
  return (
    <Header className="header">
     
      <div className="box-right">
        <div className="logo-ufrn">
          <img src={logo_ufrn} alt="Logo da UFRN" />
        </div>
        <div className="modules">
          <CgMenuGridO className="icon" />
        </div>
      </div>
      
    </Header>
  );
};

export default MyHeader;

