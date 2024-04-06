import React from "react";
import FormTipo from "../../components/FormTipo/FormTipo";
import Titulo from "../../../../components/Titulo/Titulo";
import BotaoBuscar from "../../../../components/Botoes/BotaoBuscar/BotaoBuscar";
import BotaoAdicionar from "../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../../../components/Botoes/BotaoExcluir/BotaoExcluir";
import ModalDeBusca from "../../../../components/Modals/ModalDeBusca/ModalDeBusca";

const GerenciarTipos = () => {

    

    return (

        <div> 

            <Titulo 
                titulo='Tipos'
                paragrafo='Tipos > Gerenciar tipos'
            />

            <div className="button-menu"> 
                <BotaoBuscar nome="BUSCAR TIPO" />
                <div className="grouped-buttons">
                    <BotaoAdicionar />
                    <BotaoExcluir/>
                </div>
            </div>

            <ModalDeBusca  
                titulo="Buscar membro" 
                label="Nome do membro"
                name="name-membro"
                
            />

            <div className="global-div"> 
                <FormTipo />
            </div>


        </div>
    )
}

export default GerenciarTipos