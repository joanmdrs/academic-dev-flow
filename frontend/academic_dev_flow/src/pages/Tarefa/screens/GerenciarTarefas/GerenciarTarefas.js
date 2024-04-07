import React, { useState } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import { FaPlus } from "react-icons/fa";
import {Button} from 'antd'
import FormAdminTarefa from "../../components/FormAdminTarefa/FormAdminTarefa";
import ListaTarefas from "../../components/ListaTarefas/ListaTarefas"

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
                        icon={<FaPlus />} 
                        type="primary"  
                    >
                        Criar Tarefa
                    </Button>
            </div>

        
            <FormAdminTarefa />
                

        
        </React.Fragment>            
    )
}

export default GerenciarTarefas