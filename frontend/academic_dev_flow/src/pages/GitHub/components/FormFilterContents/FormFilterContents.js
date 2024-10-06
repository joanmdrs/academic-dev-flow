import React from "react";
import { Form, Input, Button } from 'antd';
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";

const FormFilterContents = ({ onSearch, inputSelectProject }) => {
    const [form] = Form.useForm();
    const { dadosProjeto } = useContextoGlobalProjeto();



    const handleFilterContents = async (dados) => {
        dados['github_token'] = dadosProjeto.token;
        dados['repository'] = dadosProjeto.nome_repo;
        onSearch(dados);
    };

    return (
        <Form
            form={form}
            className="global-form"
            onFinish={handleFilterContents}
            layout="vertical"
        >

            {inputSelectProject}

            <Form.Item
                name="folder"
                rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
            >
                <Input name="folder" placeholder="Informe a pasta dos artefatos do repositório" />
            </Form.Item>

            <div style={{ display: 'flex', gap: '10px' }}>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Buscar
                    </Button>
                </Form.Item>
            </div>
        </Form>
    );
}

export default FormFilterContents;
