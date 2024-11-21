import { Button, Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { listarProjetos } from "../../../../services/projetoService";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import { listarCategoriaFuncaoMembro } from "../../../../services/funcaoMembroProjetoService";
import { buscarMembrosPorProjeto } from "../../../../services/membroProjetoService";

const FormFilterFuncaoMembro = ({onSubmit}) => {

    const [optionsProjetos, setOptionsProjetos] = useState([]);
    const [optionsMembroProjeto, setOptionsMembroProjeto] = useState([]);
    const [optionsCategorias, setOptionsCategoria] = useState([]);
    const [enableOptionMembroProjeto, setEnableOptionMembroProjeto] = useState(true);
    const [membroProjetoSelecionado, setMembroProjetoSelecionado] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            await handleGetProjetos();
            await handleGetCategoriasFuncaoMembro();
        };
        fetchData();
    }, []);

    const handleGetProjetos = async () => {
        try {
            const response = await listarProjetos();

            if (!response.error) {
                const resultados = response.data.map((item) => ({
                    value: item.id,
                    label: item.nome,
                }));
                setOptionsProjetos(resultados);
            }
        } catch (error) {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING);
        }
    };

    const handleGetCategoriasFuncaoMembro = async () => {
        try {
            const response = await listarCategoriaFuncaoMembro();
            if (!response.error) {
                const resultados = response.data.map((item) => ({
                    value: item.id,
                    label: item.nome,
                }));
                setOptionsCategoria(resultados);
            }
        } catch (error) {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING);
        }
    };

    const handleGetMembrosProjeto = async (id) => {
        try {
            setMembroProjetoSelecionado(null);
            setEnableOptionMembroProjeto(true);
            if (id) {
                const response = await buscarMembrosPorProjeto(id);
                if (!response.error) {
                    const resultados = response.data.map((item) => ({
                        value: item.id,
                        label: `${item.nome_membro} - ${item.nome_grupo}`,
                    }));
                    setOptionsMembroProjeto(resultados);
                    setEnableOptionMembroProjeto(false); 
                }
            }
            
        } catch (error) {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING);
        }
    };
    

    return (
        <React.Fragment>
            <Form className="global-form" onFinish={onSubmit}>
                <Form.Item
                    label="Projeto"
                    name="projeto"
                >
                    <Select
                        name="projeto"
                        showSearch
                        allowClear
                        placeholder="Pesquise ou selecione o projeto"
                        options={optionsProjetos}
                        onChange={(value) => handleGetMembrosProjeto(value)}
                        filterOption={(input, option) => option?.label.toLowerCase().includes(input.toLowerCase())}
                    />
                </Form.Item>

                <Form.Item
                    label="Membro"
                    name="membro_projeto"
                >
                    <Select
                        name="membro_projeto"
                        disabled={enableOptionMembroProjeto}
                        allowClear
                        placeholder="Selecione o membro"
                        options={optionsMembroProjeto}
                        showSearch
                        value={membroProjetoSelecionado}
                        onChange={(value) => setMembroProjetoSelecionado(value)}
                        filterOption={(input, option) => option?.label.toLowerCase().includes(input.toLowerCase())}
                    />
                </Form.Item>

                <Form.Item
                    label="Função"
                    name="categoria_funcao"
                >
                    <Select
                        allowClear
                        placeholder="Pesquise ou selecione a categoria"
                        options={optionsCategorias}
                        filterOption={(input, option) => option?.label.toLowerCase().includes(input.toLowerCase())}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Filtrar
                    </Button>
                </Form.Item>
            </Form>
        </React.Fragment>
    )
}

export default FormFilterFuncaoMembro