import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select } from 'antd';
import { buscarProjetoPeloId, listarProjetos } from "../../../../services/projetoService";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";

const FormListarArquivos = ({ onSearch }) => {
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

    const handleBuscarArquivos = async (dados) => {
        dados['github_token'] = dadosProjeto.token;
        dados['repository'] = dadosProjeto.nome_repo;
        onSearch(dados);
    };

    return (
        <Form
            form={form}
            className="global-form"
            onFinish={handleBuscarArquivos}
            layout="vertical"
        >
            <Form.Item>
                <h4>LISTAR ARQUIVOS</h4>
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

export default FormListarArquivos;
