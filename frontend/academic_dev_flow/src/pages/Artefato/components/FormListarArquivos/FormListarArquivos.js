import React from "react";
import {Form, Input, Button} from 'antd'
import SelectProjeto from "../SelectProjeto/SelectProjeto";
import { useContextoArtefato } from "../../context/ContextoArtefato";

const  FormListarArquivos = ({onSearch}) => {
    const {dadosProjeto} = useContextoArtefato()

    const handleBuscarArquivos = async (dados) => {
        dados['github_token'] = dadosProjeto.token
        dados['repository'] = dadosProjeto.nome_repo

        console.log(dados)
        onSearch(dados)
    }

    return (
        <Form  className="global-form" onFinish={handleBuscarArquivos} layout="vertical" style={{width: "50%"}}>
            <Form.Item>
                <h4> LISTAR ARQUIVOS </h4>
            </Form.Item>


            <SelectProjeto />

            <Form.Item name="folder" required>
                <Input name="folder" placeholder="Informe a pasta dos artefatos do repositório" /> 
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit"> 
                    Buscar
                </Button>
            </Form.Item>
        </Form>
    )
}

export default FormListarArquivos