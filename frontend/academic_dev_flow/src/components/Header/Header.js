import React from 'react';
import './Header.css';
import {FiMenu} from 'react-icons/fi';
import {CgMenuGridO} from 'react-icons/cg';

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <span>Academic Dev Flow</span>
        <FiMenu className="icon"/>
      </div>
      <div className='modules'>
       <CgMenuGridO className='icon' />
      </div>
    </div>
  );
};

export default Header;
