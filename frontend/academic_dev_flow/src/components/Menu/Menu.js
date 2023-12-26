import React from 'react';
import './Menu.css'; 
import {HiOutlineClipboardList} from "react-icons/hi"
import {DiScrum} from "react-icons/di"
import { BiGroup } from "react-icons/bi";

const Menu = () => {
  return (
    <div className="menu">
        <div className='item-menu'>
            <HiOutlineClipboardList className='icon' style={{ fontSize: '20px' }} />
            <a href="/projetos">Projetos</a>
        </div>
        <div className='item-menu'>
            <DiScrum className='icon' style={{ fontSize: '25px' }} />
            <a href="/fluxos"> Fluxos</a>
        </div>
        <div className='item-menu'>
            <BiGroup className='icon' style={{ fontSize: '20px' }} />
            <a href="/membros"> Membros</a>
        </div>
        
      
    </div>
  );
};

export default Menu;
