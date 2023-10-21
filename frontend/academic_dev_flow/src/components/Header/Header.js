import React from 'react';
import './Header.css';
import {FiMenu} from 'react-icons/fi';
import {CgMenuGridO} from 'react-icons/cg';
import logo_ufrn from "../../assets/logo-ufrn.png"

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <span>Academic Dev Flow</span>
        <FiMenu className="icon"/>
      </div>
      <div className='box-right'>
        <div className='logo-ufrn'>
          <img src={logo_ufrn} alt='Logo da UFRN' />
        </div>
        <div className='modules'>
          <CgMenuGridO className='icon' />
        </div>
      </div>
      
    </div>
  );
};

export default Header;
