import { Button, Form, Input, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { listarEtapasPorFluxo } from "../../../../services/fluxoEtapaService";
import { buscarEtapaPeloId } from "../../../../services/etapaService";
import { buscarMembrosPorProjeto } from "../../../../services/membroProjetoService";
import { optionsStatusIteracoes } from "../../../../services/optionsStatus";
import { useContextoIteracao } from "../../context/contextoIteracao";
import { handleError } from "../../../../services/utils";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { NotificationManager } from "react-notifications";
import { listarReleasesPorProjeto } from "../../../../services/releaseService";

const FormIteracao = ({onSubmit, onCancel, selectProject}) => {

    const { dadosIteracao } = useContextoIteracao();
    const { dadosProjeto } = useContextoGlobalProjeto();
    const [optionsReleases, setOptionsReleases] = useState([])
    const [optionsEtapas, setOptionsEtapas] = useState([]);
    const [optionsMembros, setOptionsMembros] = useState([]);
    const [titulo, setTitulo] = useState('CADASTRAR ITERAÇÃO')
    const [form] = useForm();

    const handleGetReleases = async () => {
        try {
            const response = await listarReleasesPorProjeto(dadosProjeto.id);

            if (!response.error && response.data.length > 0){

                const resultados = response.data.map(item => ({
                    value: item.id,
                    label: item.nome,
                }));

                setOptionsReleases(resultados);
            } else {
                NotificationManager.info(
                    'O projeto selecionado não possui releases criadas. Crie as releases antes de criar as iterações !'
                )
            }
        } catch (error) {
            return handleError(error, 'Falha ao tentar buscar as releases do projeto !');
        }
    }
    
    const handleGetEtapas = async () => {
        try {
            if (dadosProjeto.fluxo) {
                const response = await listarEtapasPorFluxo(dadosProjeto.fluxo)

                if (!response.error){
                    const promises = await response.data.map( async (item) => {
                        const response2 = await buscarEtapaPeloId(item.etapa)

                        return {
                            value: item.id,
                            label: response2.data.nome
                        }
                    })

                    const results = (await Promise.all(promises))
                    setOptionsEtapas(results)
                }
            } else {
                NotificationManager.info('O projeto selecionado não possui um fluxo associado. Vincule o fluxo ao projeto !')

            }
            
            
        } catch (error) {
            return handleError(error, 'Falha ao tentar buscar as etapas do fluxo do projeto !')
        }
    }

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

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto !== null) {
                await handleGetReleases()
                await handleGetEtapas();
                await handleGetMembros();

                if (dadosIteracao !== null) {
                    form.setFieldsValue(dadosIteracao)
                    setTitulo("ATUALIZAR ITERAÇÃO")
                } else {
                    form.resetFields()
                    setTitulo('CADASTRAR ITERAÇÃO')
                }

            } else {
                setOptionsEtapas([])
                setOptionsMembros([])
            }
        };

        fetchData();
    }, [dadosProjeto, dadosIteracao]);
    
    return (
        <Form layout="vertical" className="global-form" form={form} onFinish={onSubmit}>
            <Form.Item>
                <h4> {titulo} </h4>
            </Form.Item>

            {selectProject}

            <div style={{display: 'flex', gap: '20px'}}> 
                <div style={{flex: '2'}}> 
                    <Form.Item 
                        label="Nome" 
                        name="nome" 
                        style={{ flex: "1"}} 
                        rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                    >
                        <Input type='text' name="nome" placeholder="nome" />
                    </Form.Item>

                    <Form.Item label="Descrição" name="descricao">
                        <Input.TextArea rows={5} name="descricao" placeholder="descrição ..." />
                    </Form.Item>

                    <div style={{display: 'flex', gap: '10px'}}> 
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
                            ]}
                        >
                            <Input type="date" name="data_inicio" style={{width: 'fit-content'}}/>
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
                            ]}
                        >
                            <Input type="date" name="data_termino" style={{width: 'fit-content'}}/>
                        </Form.Item>
                    </div>
                </div>
            
                <div style={{flex: '1'}}> 
                    <Form.Item
                        label="Release"
                        name="release"
                        style={{ flex: "1"}} 
                        rules={[{ required: true, message: 'Por favor, preencha este campo !'}]}
                    >
                        <Select options={optionsReleases} defaultValue="Selecione"/>

                    </Form.Item>

                    <Form.Item 
                        label="Status" 
                        name="status" 
                        style={{ flex: "1"}} 
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                    >
                        <Select options={optionsStatusIteracoes} defaultValue="Selecione"/>
                    </Form.Item>
            
                    <Form.Item 
                        label="Etapa" 
                        name="etapa" 
                        style={{ flex: "1"}} 
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                    >
                        <Select options={optionsEtapas} defaultValue="Selecione" />
                    </Form.Item>

                    <Form.Item 
                        label="Responsável" 
                        name="responsavel" 
                        style={{ flex: "1"}} 
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                    >
                        <Select options={optionsMembros} defaultValue="Selecione" />
                    </Form.Item>
                </div>
            </div>
                  
            <Space style={{display: 'flex', gap: '10px'}}>
                <Button type="primary" htmlType="submit"> Salvar </Button>
                <Button onClick={onCancel} type="primary" danger> Cancelar </Button>
            </Space>
        </Form>
    )
}

export default FormIteracao
