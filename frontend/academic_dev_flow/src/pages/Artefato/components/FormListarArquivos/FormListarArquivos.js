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
        // onSearch(dados)
    }

    return (
        <Form onFinish={handleBuscarArquivos} layout="vertical">
            <SelectProjeto />

            <Form.Item label="Nome da pasta" name="folder">
                <Input name="folder" placeholder="nome da pasta" /> 
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