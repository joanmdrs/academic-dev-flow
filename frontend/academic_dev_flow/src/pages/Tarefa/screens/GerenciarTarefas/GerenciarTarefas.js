import React, { useState } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import { FaPlus, FaSearch } from "react-icons/fa";
import {Button} from 'antd'
import FormAdminTarefa from "../../components/FormAdminTarefa/FormAdminTarefa";
import ListaTarefas from "../../components/ListaTarefas/ListaTarefas"
import SelecionarProjeto from "../../components/SelecionarProjeto/SelecionarProjeto";
import FormBuscarTarefa from "../../components/FormBuscarTarefa/FormBuscarTarefa";

const GerenciarTarefas = () => {

    const [isFormVisivel, setIsFormVisivel] = useState(false)
    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(true)

    return (

        <React.Fragment>


            <Titulo 
                titulo='Tarefas'
                paragrafo='Tarefas > Gerenciar tarefas'
            />

            <div className="button-menu"> 

                <Button
                    icon={<FaSearch />} 
                    type="primary"
                    onClick={() => setIsFormBuscarVisivel(!isFormBuscarVisivel)}
                >
                    Buscar
                </Button>
                <Button 
                    icon={<FaPlus />} 
                    type="primary"  
                >
                    Criar Tarefa
                </Button>
            </div>

            {isFormBuscarVisivel && (
                <div className="global-div" style={{width: '50%'}}>   
                    <FormBuscarTarefa />
                </div>
            )}

            <div className="global-div"> 
                {
                    isFormVisivel ? (<FormAdminTarefa />)
                    : (<ListaTarefas />)
                }
            </div>

        
        
        </React.Fragment>            
    )
}

export default GerenciarTarefas