import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { handleError, handleInfo } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import { listarCategoriaFuncaoMembro } from "../../../../services/funcaoMembroProjetoService";
import { useForm } from "antd/es/form/Form";
import { listarIteracoesPorProjeto } from "../../../../services/iteracaoService";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { useMembroContexto } from "../../context/MembroContexto";

const FormFuncaoMembro = ({ onCancel, onSubmit }) => {

    const {dadosProjeto} = useContextoGlobalProjeto()
    const { dadosFuncaoMembro, dadosMembroProjeto } = useMembroContexto();

    const [optionsIteracao, setOptionsIteracao] = useState([])
    const [optionsCategorias, setOptionsCategoria] = useState([]);
    const [form] = useForm();
    const [titulo, setTitulo] = useState("ATRIBUIR FUNÇÃO AO MEMBRO");

    useEffect(() => {
        const fetchData = async () => {

            await handleGetCategoriasFuncaoMembro();

            if (dadosProjeto !== null){
                await handleGetIteracoes()
            }

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

    const handleGetIteracoes = async () => {
        const response = await listarIteracoesPorProjeto(dadosProjeto.id)

        if (!response.error && response.data.length > 0){
            const iteracoesOrdenadas = response.data.sort((a, b) => a.numero - b.numero);

            const resultados = iteracoesOrdenadas.map((item) => {
                return {
                    value: item.id,
                    label: item.nome
                }
            })

            setOptionsIteracao(resultados)
        }
    }

    return (
        <Form className="global-form" layout="vertical" onFinish={onSubmit} form={form}>
            <Form.Item>
                <h4 className='global-title'> {titulo} </h4>
            </Form.Item>

            <Form.Item
                label="Projeto"
                name="projeto"
                initialValue={dadosProjeto?.nome}
            >
                <Input name="projeto" disabled/>

            </Form.Item>

            <Form.Item
                label="Membro"
                name="membro_projeto"
                initialValue={dadosMembroProjeto?.nome_membro}
            >
                <Input name="membro_projeto" disabled />
            </Form.Item>

            <Form.Item
                label="Iteracao"
                name="iteracao"
                rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
            >
                <Select
                    name="iteracao"
                    allowClear
                    placeholder="Selecione a iteração"
                    options={optionsIteracao}
                    showSearch
                    filterOption={(input, option) => option?.label.toLowerCase().includes(input.toLowerCase())}
                />
            </Form.Item>

            <Form.Item
                label="Função"
                name="categoria_funcao"
                rules={[{ required: true, message: "Por favor, selecione uma opção!" }]}
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
    );
};

export default FormFuncaoMembro;
