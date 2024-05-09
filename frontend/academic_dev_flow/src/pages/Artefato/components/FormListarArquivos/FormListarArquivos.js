import React from "react";
import {Form, Input, Button} from 'antd'
import SelectProjeto from "../SelectProjeto/SelectProjeto";
import { useContextoArtefato } from "../../context/ContextoArtefato";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";

const  FormListarArquivos = ({onSearch, onClear}) => {
    const {dadosProjeto} = useContextoGlobalProjeto()

    const handleBuscarArquivos = async (dados) => {
        dados['github_token'] = dadosProjeto.token
        dados['repository'] = dadosProjeto.nome_repo
        onSearch(dados)
    }

    return (
        <Form className="global-form" onFinish={handleBuscarArquivos} layout="vertical">
            <Form.Item>
                <h4> LISTAR ARQUIVOS </h4>
            </Form.Item>


            <SelectProjeto />

            <Form.Item name="folder" required>
                <Input name="folder" placeholder="Informe a pasta dos artefatos do repositório" /> 
            </Form.Item>

            <div style={{display: 'flex', gap: '10px'}}> 

                <Form.Item>
                    <Button type="primary" htmlType="submit"> 
                        Buscar
                    </Button>
                </Form.Item>

                <Form.Item>
                    <Button onClick={onClear}>
                        Limpar
                    </Button>
                </Form.Item>



            </div>

            
        </Form>
    )
}

export default FormListarArquivos