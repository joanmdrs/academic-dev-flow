import { Button, Form, Input, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useContextoRelease } from "../../context/ContextoRelease";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { listarEtapasPorFluxo } from "../../../../services/fluxoEtapaService";
import { NotificationManager } from "react-notifications";
import { buscarEtapaPeloId } from "../../../../services/etapaService";
import { handleError } from "../../../../services/utils";
import { buscarMembrosPorProjeto } from "../../../../services/membroProjetoService";
import { optionsStatusReleases } from "../../../../services/optionsStatus";


const FormRelease = ({onSubmit, onCancel, selectProject}) => {

    const { releaseData } = useContextoRelease();
    const { dadosProjeto } = useContextoGlobalProjeto();
    const [form] = useForm();
    const [optionsEtapas, setOptionsEtapas] = useState([]);
    const [optionsMembros, setOptionsMembros] = useState([]);
    const [titulo, setTitulo] = useState('CADASTRAR RELEASE')

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
                await handleGetEtapas();
                await handleGetMembros();

                if (releaseData !== null) {
                    form.setFieldsValue(releaseData)
                    setTitulo("ATUALIZAR RELEASE")
                } else {
                    form.resetFields()
                    setTitulo('CADASTRAR RELEASE')
                }

            } else {
                form.resetFields()
                setOptionsEtapas([])
                setOptionsMembros([])
            }
        };

        fetchData();
    }, [dadosProjeto, releaseData]);
    
    return (
        <Form layout="vertical" className="global-form" form={form} onFinish={onSubmit}>
            <Form.Item>
                <h4> {titulo} </h4>
            </Form.Item>

            {selectProject}

            <div style={{display: 'flex', gap: '10px'}}>
                <div style={{flex: '2'}}>
                    <Form.Item 
                        label="Nome" 
                        name="nome" 
                        rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                    >
                        <Input type='text' name="nome" placeholder="nome" />
                    </Form.Item>

                    <Form.Item label="Descrição" name="descricao">
                        <Input.TextArea rows={5} name="descricao" placeholder="descrição ..." />
                    </Form.Item>

                    <Form.Item 
                        label="Data de Lançamento" 
                        name="data_lancamento" 
                        rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                    >
                        <Input type="date" name="data_lancamento" style={{width: 'fit-content'}}/>
                    </Form.Item>
                </div>

                <div style={{flex: '1'}}>

                    <Form.Item 
                        label="Status" 
                        name="status" 
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                    >
                        <Select allowClear options={optionsStatusReleases} defaultValue="Selecione"/>
                    </Form.Item>
            
                    <Form.Item 
                        label="Etapa" 
                        name="etapa" 
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                    >
                        <Select allowClear options={optionsEtapas} defaultValue="Selecione" />
                    </Form.Item>

                    <Form.Item 
                        label="Responsável" 
                        name="responsavel" 
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                    >
                        <Select allowClear options={optionsMembros} defaultValue="Selecione" />
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

export default FormRelease
