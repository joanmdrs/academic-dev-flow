import React, { useState } from "react";
import FormTipo from "../../components/FormTipo/FormTipo";
import Titulo from "../../../../components/Titulo/Titulo";
import BotaoBuscar from "../../../../components/Botoes/BotaoBuscar/BotaoBuscar";
import BotaoAdicionar from "../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../../../components/Botoes/BotaoExcluir/BotaoExcluir";
import ModalDeBusca from "../../../../components/Modals/ModalDeBusca/ModalDeBusca";
import ListaTipos from "../../components/ListaTipos/ListaTipos";

const GerenciarTipos = () => {

    const [isFormVisivel, setIsFormVisivel] = useState(false)
    

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

                { isFormVisivel ? 
                    (
                        <FormTipo />
                    )
                    : null
                }
            </div>

            <div className="global-div"> 
                <ListaTipos />

            </div>



        </div>
    )
}

export default GerenciarTipos