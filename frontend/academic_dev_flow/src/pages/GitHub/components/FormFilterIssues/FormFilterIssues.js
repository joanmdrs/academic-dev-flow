import React, { useEffect, useState } from "react";
import { Form, Button, Select, notification } from 'antd';
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { buscarProjetoPeloId, listarProjetos } from "../../../../services/projetoService";
import { NotificationManager } from "react-notifications";

const FormFilterIssues = ({ onSearch }) => {

    const [form] = Form.useForm();
    const [optionsProjetos, setOptionsProjetos] = useState([]);
    const { dadosProjeto, setDadosProjeto } = useContextoGlobalProjeto();
    const [api, contextHolder] = notification.useNotification();


    const openNotificationWithIcon = (type) => {
        api[type]({
            message: 'Atenção',
            description:
                'O projeto selecionado não possui credenciais de acesso a um repositório do GitHub. Para realizar a conexão com o GitHub, adicione as informações de acesso ao repositório no menu de Projetos.',
            duration: 3
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listarProjetos();
                const resultados = response.data.map((item) => ({
                    value: item.id,
                    label: item.nome
                }));
                setOptionsProjetos(resultados);
            } catch (error) {
                console.error("Erro ao obter projetos:", error);
            }
        };
        fetchData();
    }, []);

    const handleChange = async (value) => {
        const response = await buscarProjetoPeloId(value);

        if (!response.error) {
            setDadosProjeto(response.data);
        }
    };

    const handleBuscarIssues = async (dados) => {

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
                onFinish={handleBuscarIssues}
                layout="vertical"
            >
                <Form.Item>
                    <h4>FILTRAR ISSUES</h4>
                </Form.Item>

                <Form.Item
                    name="projeto"
                    rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                >
                    <Select
                        allowClear
                        placeholder="Pesquise ou selecione o projeto"
                        onChange={handleChange}
                        options={optionsProjetos}
                    />
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

export default FormFilterIssues;
