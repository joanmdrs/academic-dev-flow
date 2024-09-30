import React from "react";
import { Form, Input, Button } from 'antd';
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";

const FormBuscarContents = ({ onSearch, onClear, inputs }) => {
    const { dadosProjeto } = useContextoGlobalProjeto();
    const [form] = Form.useForm();

    const handleGetContents = async (dados) => {
        const parametros = {
            github_token: dadosProjeto.token,
            repository: dadosProjeto.nome_repo,
            folder: dados.folder
        };
        onSearch(parametros);
    };

    return (
        <Form form={form} onFinish={handleGetContents} layout="vertical">

            {inputs}

            <Form.Item 
                name="folder" 
                rules={[{ required: true, message: 'Por favor, informe a pasta dos artefatos do repositório' }]}
            >
                <Input name="folder" placeholder="Informe a pasta dos artefatos do repositório" />
            </Form.Item>
            <div style={{ display: 'flex', gap: '10px' }}>
                <Button type="primary" htmlType="submit">
                    Buscar
                </Button>
                <Button
                    onClick={() => {
                        onClear();
                        form.resetFields();
                    }}
                >
                    Limpar
                </Button>
            </div>
        </Form>
    );
};

export default FormBuscarContents;
