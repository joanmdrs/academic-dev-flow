import React from "react";
import {Form, Input, Button} from 'antd'
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";

const  FormBuscarContents = ({onSearch, onClear, inputs}) => {
    const {dadosProjeto} = useContextoGlobalProjeto()
    const [form] = Form.useForm()

    const handleGetContents = async (dados) => {
        const parametros = {
            github_token: dadosProjeto.token,
            repository: dadosProjeto.nome_repo,
            folder: dados.folder
        }
        onSearch(parametros)
    }

    return (
        <Form form={form} onFinish={handleGetContents} layout="vertical">

            {inputs}
    
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
                    <Button 
                        onClick={ () => {
                            onClear()
                            form.resetFields()
                        }}
                    >
                        Limpar
                    </Button>
                </Form.Item>



            </div>

            
        </Form>
    )
}

export default FormBuscarContents