import React from 'react';
import './Menu.css'; 
import icon_projeto from "../../assets/icone-projeto.png"
import icon_fluxo from "../../assets/icone-fluxo.png"

const Menu = () => {
  return (
    <div className="menu">
        <div className='item-menu'>
            <img src={icon_projeto} alt='Ícone de Projeto'/>

            <a href="/projetos">Projetos</a>
        </div>
        <div className='item-menu'>
            <img src={icon_fluxo} alt='Ícone de Projeto'/>

            <a href="/fluxos"> Fluxos</a>
        </div>
        
      
    </div>
  );
};

export default Menu;
