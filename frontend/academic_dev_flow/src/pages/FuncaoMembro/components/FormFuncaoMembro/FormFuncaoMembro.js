import { Button, Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { listarProjetos } from "../../../../services/projetoService";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import { buscarMembrosPorProjeto } from "../../../../services/membroProjetoService";
import { listarCategoriaFuncaoMembro } from "../../../../services/funcaoMembroProjetoService";
import { useFuncaoMembroContexto } from "../../context/FuncaoMembroContexto";
import { useForm } from "antd/es/form/Form";

const FormFuncaoMembro = ({ onCancel, onSubmit }) => {
    const [optionsProjetos, setOptionsProjetos] = useState([]);
    const [optionsMembroProjeto, setOptionsMembroProjeto] = useState([]);
    const [optionsCategorias, setOptionsCategoria] = useState([]);
    const [enableOptionMembroProjeto, setEnableOptionMembroProjeto] = useState(true);
    const { dadosFuncaoMembro, setDadosFuncaoMembro } = useFuncaoMembroContexto();
    const [form] = useForm();
    const [titulo, setTitulo] = useState("ATRIBUIR FUNÇÃO AO MEMBRO");
    const [membroProjetoSelecionado, setMembroProjetoSelecionado] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            await handleGetProjetos();
            await handleGetCategoriasFuncaoMembro();

            if (dadosFuncaoMembro !== null) {
                form.setFieldsValue(dadosFuncaoMembro);
                setTitulo("EDITAR FUNÇÃO DO MEMBRO");
            } else {
                form.resetFields();
                setTitulo("ATRIBUIR FUNÇÃO AO MEMBRO");
            }
        };
        fetchData();
    }, [dadosFuncaoMembro, form]);

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
            form.setFieldsValue({ membro_projeto: undefined });
            setMembroProjetoSelecionado(null);
            setEnableOptionMembroProjeto(true);

            const response = await buscarMembrosPorProjeto(id);
            if (!response.error) {
                const resultados = response.data.map((item) => ({
                    value: item.id,
                    label: `${item.nome_membro} - ${item.nome_grupo}`,
                }));
                setOptionsMembroProjeto(resultados);
                setEnableOptionMembroProjeto(false); // Reativa o campo após carregar
            }
        } catch (error) {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING);
        }
    };

    const handleSubmitForm = (values) => {
        const { membro_projeto, categoria_funcao } = values;
        
        const funcoesArray = Array.isArray(categoria_funcao) ? categoria_funcao : [categoria_funcao];
    
        const arrayDeObjetos = funcoesArray.map((funcao) => ({
            membro_projeto: membro_projeto,
            categoria_funcao: funcao,
        }));
    
    
        onSubmit(arrayDeObjetos);
    };

    return (
        <div className="global-div">
            <Form className="global-form" layout="vertical" onFinish={handleSubmitForm} form={form} style={{width: '50%'}}>
                <Form.Item>
                    <h4> {titulo} </h4>
                </Form.Item>

                <Form.Item
                    label="Projeto"
                    name="projeto"
                    rules={[{ required: true, message: "Por favor, selecione o projeto para conseguir visualizar os membros!" }]}
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
                    rules={[{ required: true, message: "Por favor, selecione um membro!" }]}
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
                    rules={[{ required: true, message: "Por favor, selecione uma função!" }]}
                >
                    <Select
                        mode="multiple"
                        allowClear
                        showSearch
                        placeholder="Pesquise ou selecione a categoria"
                        options={optionsCategorias}
                        filterOption={(input, option) => option?.label.toLowerCase().includes(input.toLowerCase())}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Salvar
                    </Button>
                    <Button type="primary" style={{ marginLeft: "10px" }} danger onClick={() => onCancel()}>
                        Cancelar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default FormFuncaoMembro;
