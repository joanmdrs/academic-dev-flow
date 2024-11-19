import { Button, Form, Input, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { listarEtapasPorFluxo } from "../../../../services/fluxoEtapaService";
import { buscarEtapaPeloId } from "../../../../services/etapaService";
import { buscarMembrosPorProjeto } from "../../../../services/membroProjetoService";
import { optionsStatusIteracoes } from "../../../../services/optionsStatus";
import { useContextoIteracao } from "../../context/contextoIteracao";
import { formatDateIso, handleError } from "../../../../services/utils";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { NotificationManager } from "react-notifications";
import { buscarReleasePeloId, listarReleasesPorProjeto } from "../../../../services/releaseService";

const FormIteracao = ({ onSubmit, onCancel, selectProject }) => {

    const { dadosIteracao } = useContextoIteracao();
    const { dadosProjeto } = useContextoGlobalProjeto();
    const [dadosRelease, setDadosRelease] = useState(null);
    const [optionsReleases, setOptionsReleases] = useState([]);
    const [optionsEtapas, setOptionsEtapas] = useState([]);
    const [optionsMembros, setOptionsMembros] = useState([]);
    const [titulo, setTitulo] = useState('CADASTRAR ITERAÇÃO');
    const [form] = useForm();

    const handleGetReleases = async () => {
        try {
            const response = await listarReleasesPorProjeto(dadosProjeto.id);
            if (!response.error && response.data.length > 0) {
                const resultados = response.data.map(item => ({
                    value: item.id,
                    label: `${item.nome} - ${formatDateIso(item.data_lancamento)}`
                }));
                setOptionsReleases(resultados);
            } else {
                NotificationManager.info(
                    'O projeto selecionado não possui releases criadas. Crie as releases antes de criar as iterações !'
                );
            }
        } catch (error) {
            return handleError(error, 'Falha ao tentar buscar as releases do projeto !');
        }
    };

    const handleGetEtapas = async () => {
        try {
            if (dadosProjeto.fluxo) {
                const response = await listarEtapasPorFluxo(dadosProjeto.fluxo);
                if (!response.error) {
                    const promises = await response.data.map(async (item) => {
                        const response2 = await buscarEtapaPeloId(item.etapa);
                        return {
                            value: item.id,
                            label: response2.data.nome,
                        };
                    });

                    const results = (await Promise.all(promises));
                    setOptionsEtapas(results);
                }
            } else {
                NotificationManager.info('O projeto selecionado não possui um fluxo associado. Vincule o fluxo ao projeto !');
            }
        } catch (error) {
            return handleError(error, 'Falha ao tentar buscar as etapas do fluxo do projeto !');
        }
    };

    const handleGetMembros = async () => {
        try {
            const response = await buscarMembrosPorProjeto(dadosProjeto.id);
            const resultados = response.data.map(item => ({
                value: item.id,
                label: `${item.nome_membro} (${item.nome_grupo})`,
            }));
            setOptionsMembros(resultados);
        } catch (error) {
            return handleError(error, 'Falha ao tentar buscar os membros do projeto !');
        }
    };

    const handleBuscarRelease = async (idRelease) => {

        if (idRelease){
            const response = await buscarReleasePeloId(idRelease);
            if (!response.error) {
                setDadosRelease(response.data);
            }
        } else {
            setDadosRelease(null)
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto !== null) {
                await handleGetReleases();
                await handleGetEtapas();
                await handleGetMembros();
                if (dadosIteracao !== null) {
                    form.setFieldsValue(dadosIteracao);
                    setTitulo("ATUALIZAR ITERAÇÃO");
                } else {
                    form.resetFields();
                    setTitulo('CADASTRAR ITERAÇÃO');
                }
            } else {
                setOptionsEtapas([]);
                setOptionsMembros([]);
            }
        };
        fetchData();
    }, [dadosProjeto, dadosIteracao]);

    const validateDateWithinProjectRange = ({ getFieldValue }) => ({
        validator(_, value) {
            const dataInicio = getFieldValue('data_inicio');
            const dataTermino = getFieldValue('data_termino');
            
            if (dadosProjeto && dataInicio && dataTermino) {
                const projetoInicio = new Date(dadosProjeto.data_inicio);
                const projetoTermino = new Date(dadosProjeto.data_termino);
                const inicio = new Date(dataInicio);
                const termino = new Date(dataTermino);
    
                if (inicio < projetoInicio || inicio > projetoTermino) {
                    return Promise.reject(new Error(`A data de início deve estar entre ${formatDateIso(dadosProjeto.data_inicio)} e ${formatDateIso(dadosProjeto.data_termino)}`));
                }
                if (termino < projetoInicio || termino > projetoTermino) {
                    return Promise.reject(new Error(`A data de término deve estar entre ${formatDateIso(dadosProjeto.data_inicio)} e ${formatDateIso(dadosProjeto.data_termino)}`));
                }
            }
            return Promise.resolve();
        }
    });
    
    const validateDateBeforeRelease = ({ getFieldValue }) => ({
        validator(_, value) {
            const releaseData = dadosRelease ? dadosRelease.data_lancamento : null;
            const dataInicio = getFieldValue('data_inicio');
            const dataTermino = getFieldValue('data_termino');
    
            if (releaseData) {
                const releaseDate = new Date(releaseData);
                const inicio = new Date(dataInicio);
                const termino = new Date(dataTermino);
    
                if (inicio > releaseDate || termino > releaseDate) {
                    return Promise.reject(new Error('As datas precisam ser antes da data de lançamento da release.'));
                }
            }
            return Promise.resolve();
        }
    });
    

    return (
        <Form layout="vertical" className="global-form" form={form} onFinish={onSubmit}>
            <Form.Item>
                <h4> {titulo} </h4>
            </Form.Item>

            {selectProject}

            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: '2' }}>
                    <Form.Item
                        label="Nome"
                        name="nome"
                        style={{ flex: "1" }}
                        rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                    >
                        <Input type='text' name="nome" placeholder="nome" />
                    </Form.Item>

                    <Form.Item label="Descrição" name="descricao">
                        <Input.TextArea rows={5} name="descricao" placeholder="descrição ..." />
                    </Form.Item>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Form.Item
                            label="Ordem"
                            name="ordem"
                            rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                        >
                            <Input type="number" name="ordem" placeholder="número" />
                        </Form.Item>

                        <Form.Item
                            label="Data de Início"
                            name="data_inicio"
                            rules={[
                                { required: true, message: 'Por favor, preencha este campo!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        const dataTermino = getFieldValue('data_termino');
                                        if (!value || !dataTermino || value <= dataTermino) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('A data de início não pode ser maior que a data de término!'));
                                    },
                                }),
                                validateDateWithinProjectRange,
                                validateDateBeforeRelease
                            ]}
                        >
                            <Input 
                                type="date" 
                                name="data_inicio" 
                                style={{ width: 'fit-content' }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Data de Término"
                            name="data_termino"
                            rules={[
                                { required: true, message: 'Por favor, preencha este campo!' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        const dataInicio = getFieldValue('data_inicio');
                                        if (!value || !dataInicio || value >= dataInicio) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('A data de término não pode ser menor que a data de início!'));
                                    },
                                }),
                                validateDateWithinProjectRange,
                                validateDateBeforeRelease
                            ]}
                        >
                            <Input 
                                type="date" 
                                name="data_termino" 
                                style={{ width: 'fit-content' }} 
                            />
                        </Form.Item>
                    </div>
                </div>

                <div style={{ flex: '1' }}>
                    <Form.Item
                        label="Release"
                        name="release"
                        style={{ flex: "1" }}
                        rules={[{ required: true, message: 'Por favor, preencha este campo !' }]}
                    >
                        <Select
                            allowClear
                            onChange={(value) => handleBuscarRelease(value)}
                            options={optionsReleases}
                            placeholder="Selecione a release"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Status"
                        name="status"
                        style={{ flex: "1" }}
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                    >
                        <Select options={optionsStatusIteracoes}  placeholder="Selecione o status" />
                    </Form.Item>

                    <Form.Item
                        label="Etapa"
                        name="etapa"
                        style={{ flex: "1" }}
                        rules={[{ required: true, message: 'Por favor, selecione a etapa!' }]}
                    >
                        <Select options={optionsEtapas} placeholder="Selecione a etapa" />
                    </Form.Item>

                    <Form.Item
                        label="Responsável"
                        name="responsavel"
                    >
                        <Select
                            style={{ width: '100%' }}
                            placeholder="Selecione os membros"
                            options={optionsMembros}
                        />
                    </Form.Item>
                </div>
            </div>

            <Space>
                <Button type="primary" htmlType="submit">Salvar</Button>
                <Button type="primary" danger onClick={onCancel}>Cancelar</Button>
            </Space>
        </Form>
    );
};

export default FormIteracao;
