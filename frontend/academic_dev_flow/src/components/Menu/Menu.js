import React from 'react';
import './Menu.css'; 
import icon from "../../assets/icone-projeto.png"

const Menu = () => {
  return (
    <div className="menu">
        <div className='item-menu'>
            <img src={icon} alt='Ícone de Projeto'/>
            <a href="/projetos">Projetos</a>
        </div>
      
    </div>
  );
};

export default Menu;
