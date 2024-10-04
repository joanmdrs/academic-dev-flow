import { Button, Form, Input, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { useContextoTarefa } from '../../context/ContextoTarefa';
import { buscarMembrosPorProjeto } from '../../../../services/membroProjetoService';
import { listarIteracoesPorProjeto } from '../../../../services/iteracaoService';
import Loading from '../../../../components/Loading/Loading';
import { optionsStatusTarefas } from '../../../../services/optionsStatus';
import { handleError } from '../../../../services/utils';
import { ERROR_MESSAGE_ON_SEARCHING } from '../../../../services/messages';
import { useContextoGlobalProjeto } from '../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto';
import { listarCategoriaTarefa } from '../../../../services/categoriaTarefaService';

function FormTarefa({ onCancel, onSubmit, selectProject, inputsAdmin }) {

    const [form] = useForm();
    const { dadosTarefa } = useContextoTarefa();
    const { dadosProjeto } = useContextoGlobalProjeto();
    const [optionsMembros, setOptionsMembros] = useState([]);
    const [optionsIteracoes, setOptionsIteracoes] = useState([]);
    const [optionsCategorias, setOptionsCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [titulo, setTitulo] = useState('CADASTRAR TAREFA');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (dadosProjeto !== null) {
                    setLoading(true);
                    await handleGetMembros();
                    await handleGetIteracoes();
                    await handleGetCategorias();
                    setLoading(false);

                    if (dadosTarefa !== null) {
                        form.setFieldsValue(dadosTarefa);
                        setTitulo('ATUALIZAR TAREFA');
                    } else {
                        form.resetFields();
                        setTitulo('CADASTRAR TAREFA');
                    }
                } 
            } catch (error) {
                console.error("Erro ao carregar dados do formulário:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [dadosTarefa, dadosProjeto]);

    const handleGetMembros = async () => {
        try {
            const response = await buscarMembrosPorProjeto(dadosProjeto.id);
            const resultados = response.data.map((item) => ({
                value: item.id,
                label: `${item.nome_membro} (${item.nome_grupo})`,
                user: item.usuario_github,
            }));
            setOptionsMembros(resultados);
        } catch (error) {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING);
        }
    };

    const handleGetIteracoes = async () => {
        try {
            const response = await listarIteracoesPorProjeto(dadosProjeto.id);
            if (response.data.length > 0) {
                const iteracoesOrdenadas = response.data.sort((a, b) => a.numero - b.numero);
                const resultados = iteracoesOrdenadas.map((item) => ({
                    value: item.id,
                    label: item.nome,
                }));
                setOptionsIteracoes(resultados);
            }
        } catch (error) {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING);
        }
    };

    const renderOptionWithColor = (label, color) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ backgroundColor: color, width: 12, height: 12, borderRadius: '50%', marginRight: 8 }}></div>
            {label}
        </div>
    );

    const handleGetCategorias = async () => {
        try {
            const response = await listarCategoriaTarefa();
            if (!response.error && response.data) {
                const resultados = response.data.map((item) => ({
                    value: item.id,
                    label: renderOptionWithColor(item.nome, item.cor),
                    color: item.cor,
                }));
                setOptionsCategorias(resultados);
            }
        } catch (error) {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING);
        }
    };

    const handleSubmitForm = () => {
        const dadosForm = form.getFieldsValue();
        const membrosSelecionados = dadosForm.membros;
        const usuariosGithub = optionsMembros
            .filter((option) => membrosSelecionados.includes(option.value))
            .map((option) => option.user);
        dadosForm['assignees'] = usuariosGithub;
        onSubmit(dadosForm);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <Form form={form} layout='vertical' className='global-form' onFinish={handleSubmitForm}>
            <Form.Item>
                <h4> {titulo} </h4>
            </Form.Item>

            {selectProject && (
                <Form.Item>
                    {selectProject}
                </Form.Item>
            )}

            <div style={{ display: 'flex', gap: "20px" }}>
                <div style={{ flex: "2" }}>
                    <Form.Item
                        label="Nome"
                        name="nome"
                        rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                    >
                        <Input type='text' name='nome' />
                    </Form.Item>

                    <Form.Item
                        label="Descrição"
                        name="descricao"
                    >
                        <Input.TextArea rows={6} name='descricao' />
                    </Form.Item>

                    <div style={{display: 'flex', gap: '10px'}}> 
                        <Form.Item
                            label="Data de Início"
                            name="data_inicio"
                            rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                        >
                            <Input type='date' name='data_inicio' style={{ width: 'fit-content' }} />
                        </Form.Item>

                        <Form.Item
                            label="Data de Término (Previsão)"
                            name="data_termino"
                            rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                        >
                            <Input type='date' name='data_termino' style={{ width: 'fit-content' }} />
                        </Form.Item>

                    </div>

                    {inputsAdmin}
                </div>

                <div style={{ flex: "1" }}>
                    <Form.Item
                        label="Iteração"
                        name="iteracao"
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                    >
                        <Select
                            allowClear
                            placeholder="Selecione"
                            options={optionsIteracoes}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Atribuir à"
                        name="membros"
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Selecione"
                            options={optionsMembros}
                        />
                    </Form.Item>

                    <Form.Item
                        label='Status'
                        name='status'
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                    >
                        <Select
                            allowClear
                            style={{ width: '100%' }}
                            placeholder='Selecione'
                            name='status'
                            options={optionsStatusTarefas}
                        />
                    </Form.Item>

                    <Form.Item
                        label='Categoria'
                        name='categoria'
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                    >
                        <Select
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Selecione"
                            name="categoria"
                            options={optionsCategorias}
                        />
                    </Form.Item>
                </div>
            </div>

            <Form.Item 
                label="Sicronizar com o GitHub ?"
                name="sicronizar-github" 
            >
                <Switch name="sicronizar-github" checkedChildren="Sicronizar" unCheckedChildren="Não sicronizar" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType='submit'> Salvar </Button>
                <Button style={{ marginLeft: "10px" }} onClick={onCancel} type='primary' danger> Cancelar </Button>
            </Form.Item>
        </Form>
    );
}

export default FormTarefa;
