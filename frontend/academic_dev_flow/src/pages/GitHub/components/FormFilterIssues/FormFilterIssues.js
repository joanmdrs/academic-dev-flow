import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from 'antd';
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { buscarProjetoPeloId, listarProjetos } from "../../../../services/projetoService";

const FormFilterIssues = ({ onSearch }) => {

    const OPTIONS_STATE = [
        {
            value: 'open',
            label: 'Abertas'
        },
        {
            value: 'closed',
            label: 'Fechadas'
        }
    ]

    const [form] = Form.useForm();
    const [optionsProjetos, setOptionsProjetos] = useState([]);
    const { dadosProjeto, setDadosProjeto } = useContextoGlobalProjeto();

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
        dados['github_token'] = dadosProjeto.token;
        dados['repository'] = dadosProjeto.nome_repo;
        onSearch(dados);
    };

    return (
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

            <Form.Item
                name="state"
                rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
            >
                <Select 
                    allowClear
                    placeholder="Informe o estado da issue"
                    options={OPTIONS_STATE} 
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
    );
}

export default FormFilterIssues;
