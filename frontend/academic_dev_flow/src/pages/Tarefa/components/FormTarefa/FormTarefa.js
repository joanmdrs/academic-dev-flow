import { Button, Form, Input, Select, Space, Tag } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import { useContextoTarefa } from '../../context/ContextoTarefa';
import { buscarMembrosPorProjeto } from '../../../../services/membroProjetoService';
import { listarIteracoesPorProjeto } from '../../../../services/iteracaoService';
import Loading from '../../../../components/Loading/Loading';
import { optionsStatusTarefas } from '../../../../services/optionsStatus';
import { convertHexToRgba, filterOption, handleError } from '../../../../services/utils';
import { ERROR_MESSAGE_ON_SEARCHING } from '../../../../services/messages';
import { useContextoGlobalProjeto } from '../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto';
import { listarCategoriaTarefa } from '../../../../services/categoriaTarefaService';
import { NotificationManager } from 'react-notifications';
import { listarTags } from '../../../../services/tagService';

function FormTarefa({ onCancel, onSubmit, selectProject, inputsAdmin }) {

    const [form] = useForm();
    const { dadosTarefa } = useContextoTarefa();
    const { dadosProjeto } = useContextoGlobalProjeto();
    const [optionsMembros, setOptionsMembros] = useState([]);
    const [optionsIteracoes, setOptionsIteracoes] = useState([]);
    const [optionsCategorias, setOptionsCategorias] = useState([]);
    const [optionsTags, setOptionsTags] = useState([])
    const [titulo, setTitulo] = useState('CADASTRAR TAREFA');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (dadosProjeto !== null) {
                    await handleGetMembros();
                    await handleGetIteracoes();
                    await handleGetCategorias();
                    await handleGetTags()

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
            }
        };
        fetchData();
    }, [dadosTarefa, dadosProjeto]);

    const handleGetMembros = async () => {
        try {
            const response = await buscarMembrosPorProjeto(dadosProjeto.id);

            const resultados = response.data.map(item => ({
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

    const handleGetTags = async () => {
        const response = await listarTags()
        if(!response.error){
            const resultados = response.data.map((item) => ({
                value: item.id,
                label: <Tag color={item.cor}>{item.nome}</Tag>
            }));
            
            setOptionsTags(resultados)
        }

    }

    const handleSubmitForm = () => {

        if (dadosProjeto === null){
            NotificationManager.info("Você deve selecionar o projeto, antes de salvar a tarefa !");
            return {'error': 'Selecione um projeto'}
        }
        const dadosForm = form.getFieldsValue();
        // const membrosSelecionados = dadosForm.membros;
        // const usuariosGithub = optionsMembros
        //     .filter((option) => membrosSelecionados.includes(option.value))
        //     .map((option) => option.user);
        // dadosForm['assignees'] = usuariosGithub;
        onSubmit(dadosForm);
    };

    // if (loading) {
    //     return <Loading />;
    // }

    return (
        <Form form={form} layout='vertical' className='global-form' onFinish={handleSubmitForm}>
            <Form.Item>
                <h4 className='global-title'> {titulo} </h4>
            </Form.Item>

            <div style={{ display: 'flex', gap: "20px", flexWrap: 'wrap' }}>
                <div style={{ flex: "2" }}>

                    {selectProject && (
                        <>
                            {selectProject}
                        </>
                    )}
                    <Form.Item
                        label="Nome"
                        name="nome"
                        rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                    >
                        <Input type='text' name='nome' placeholder='Nome da tarefa'/>
                    </Form.Item>

                    <Form.Item
                        label="Descrição"
                        name="descricao"
                    >
                        <Input.TextArea rows={5} name='descricao' placeholder='Descrição da tarefa'/>
                    </Form.Item>


                    <div style={{display: 'flex', gap: '10px'}}> 
                        <Form.Item
                            label="Data de início"
                            name="data_inicio"
                        >
                            <Input type='date' name='data_inicio' />
                        </Form.Item>

                        <Form.Item
                            label="Data de término"
                            name="data_termino"
                        >
                            <Input type='date' name='data_termino' />
                        </Form.Item>

                        <Form.Item
                            label="Data de conclusão"
                            name="data_conclusao"
                        >
                            <Input type='date' name='data_termino'/>
                        </Form.Item>

                        <Form.Item
                            label="Atribuir à"
                            name="membros"
                            style={{flex: '2'}}
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                options={optionsMembros}
                                showSearch
                                filterOption={filterOption}
                                placeholder="Atribuir à (opcional)"
                            />
                        </Form.Item>

                    </div>

                    {inputsAdmin}
                </div>

                <div style={{ flex: "1" }}>

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
                            showSearch
                            filterOption={filterOption}
                        />
                    </Form.Item>

                    <Form.Item
                        label='Status'
                        name='status'
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                    >
                        <Select
                            allowClear
                            placeholder='Selecione'
                            name='status'
                            options={optionsStatusTarefas}
                            showSearch
                            filterOption={filterOption}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Iteração"
                        name="iteracao"
                    >
                        <Select
                            allowClear
                            options={optionsIteracoes}
                            showSearch
                            filterOption={filterOption}
                            placeholder="Iteração (opcional)"
                        />
                    </Form.Item>

                    <Form.Item label="Tags" name='tags' style={{flex: '1'}}>
                        <Select 
                            allowClear
                            showSearch
                            mode='tags'
                            options={optionsTags}
                            filterOption={filterOption}
                            placeholder="Tags (opcional)"
                            
                        /> 
                    </Form.Item>

                    <Form.Item name="url_issue" label="URL da issue"> 
                        <Input type='url' name='url_issue' placeholder='url da issue (opcional)'/>
                    </Form.Item>

                </div>
            </div>

            {/* <Form.Item 
                label="Sicronizar com o GitHub ?"
                name="sicronizar-github" 
            >
                <Switch name="sicronizar-github" checkedChildren="Sicronizar" unCheckedChildren="Não sicronizar" />
            </Form.Item> */}

            <Space style={{marginTop: '20px'}}>
                <Button size='large' type="primary" htmlType='submit'> Salvar </Button>
                <Button size='large' style={{ marginLeft: "10px" }} onClick={onCancel} type='primary' danger> Cancelar </Button>
            </Space>
        </Form>
    );
}

export default FormTarefa;
