import React, { useState } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import { FaPlus, FaSearch } from "react-icons/fa";
import {Button} from 'antd'
import FormAdminTarefa from "../../components/FormAdminTarefa/FormAdminTarefa";
import ListaTarefas from "../../components/ListaTarefas/ListaTarefas"
import SelecionarProjeto from "../../components/SelecionarProjeto/SelecionarProjeto";

const GerenciarTarefas = () => {

    const [isFormVisivel, setIsFormVisivel] = useState(false)

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
                >
                    Filtrar
                </Button>
                <Button 
                    icon={<FaPlus />} 
                    type="primary"  
                >
                    Criar Tarefa
                </Button>
            </div>

            <div>   
                Form de busca
            </div>

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