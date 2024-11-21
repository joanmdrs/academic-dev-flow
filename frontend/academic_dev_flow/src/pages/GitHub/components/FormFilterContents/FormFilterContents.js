import React from "react";
import { Form, Input, Button, notification } from 'antd';
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";

const FormFilterContents = ({ onSearch, inputSelectProject }) => {
    const [form] = Form.useForm();
    const { dadosProjeto } = useContextoGlobalProjeto();
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type) => {
        api[type]({
            message: 'Atenção',
            description:
                'O projeto selecionado não possui credenciais de acesso a um repositório do GitHub. Para realizar a conexão com o GitHub, adicione as informações de acesso ao repositório no menu de Projetos.',
            duration: 3
        });
    };

    const handleFilterContents = async (dados) => {

        if (dadosProjeto.token && dadosProjeto.nome_repo){
            dados['github_token'] = dadosProjeto.token;
            dados['repository'] = dadosProjeto.nome_repo;
            onSearch(dados);
        } else {
            openNotificationWithIcon('warning')
        }
    };

    return (
        <>
            {contextHolder}
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
        </>
    );
}

export default FormFilterContents;
