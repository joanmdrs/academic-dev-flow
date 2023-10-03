import React from 'react';
import './Header.css';
import {FiMenu} from 'react-icons/fi';


const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <span>Academic Dev Flow</span>
        <FiMenu className="icon"/>
      </div>
    </div>
  );
};

export default Header;
