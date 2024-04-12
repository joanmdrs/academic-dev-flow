import React from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import { Button } from "antd";
import { FaGithub, FaSearch } from "react-icons/fa";
import FormListarArquivos from "../../components/FormListarArquivos/FormListarArquivos";
import { listContents } from "../../../../services/githubIntegration";

const GerenciarArquivosGithub = () => {

    const handleListarArquivos = async (parametros) =>{
        const response = await listContents(parametros)

        if (!response.error){
            console.log(response.data)
        }
    }

    return (
        <React.Fragment>
            <Titulo 
                titulo='Arquivos'
                paragrafo='Arquivos > Gerenciar arquivos'
            />

            <div className="global-form"> 
                <FormListarArquivos onSearch={handleListarArquivos}/>
            </div>


        </React.Fragment> 
    )
}

export default GerenciarArquivosGithub