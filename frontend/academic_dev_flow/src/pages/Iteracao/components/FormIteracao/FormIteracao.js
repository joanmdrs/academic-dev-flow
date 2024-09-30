import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { listarEtapasPorFluxo } from "../../../../services/fluxoEtapaService";
import { buscarEtapaPeloId } from "../../../../services/etapaService";
import { buscarMembrosPorProjeto } from "../../../../services/membroProjetoService";
import { optionsStatusIteracoes } from "../../../../services/optionsStatus";
import { useContextoIteracao } from "../../context/contextoIteracao";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";

const FormIteracao = ({onSubmit, onCancel, additionalFields}) => {

    const { dadosIteracao } = useContextoIteracao();
    const { dadosProjeto } = useContextoGlobalProjeto();
    const [form] = useForm();
    const [optionsEtapas, setOptionsEtapas] = useState([]);
    const [optionsMembros, setOptionsMembros] = useState([]);
    const [titulo, setTitulo] = useState('CADASTRAR ITERAÇÃO')

    const handleGetEtapas = async () => {
        try {
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
            
        } catch (error) {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
        }
    }

    const handleGetMembros = async () => {

        try {
            const response = await buscarMembrosPorProjeto(dadosProjeto.id)
            const resultados = response.data.map((item) => {
                return {
                    value: item.id_membro_projeto,
                    label: `${item.nome_membro} (${item.grupo_membro})`,
                }
            })
            setOptionsMembros(resultados)
        
        } catch (error) {   
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto !== null) {
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

            { additionalFields ? (
                <Form.Item>
                    {additionalFields}
                </Form.Item>
            ) : null}

            <div style={{display: 'flex', gap: '20px'}}> 
                <div style={{flex: '2'}}> 
                    <Form.Item label="Nome" name="nome" style={{ flex: "1"}} rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}>
                        <Input type='text' name="nome" placeholder="nome" />
                    </Form.Item>

                    <Form.Item label="Descrição" name="descricao">
                        <Input.TextArea rows={6} name="descricao" placeholder="descrição ..." />
                    </Form.Item>

                    <div style={{display: 'flex', gap: '10px'}}> 
                        <Form.Item label="Número" name="numero" rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}>
                            <Input type="number" name="numero" style={{width: 'fit-content'}} placeholder="número" />
                        </Form.Item> 

                        <Form.Item label="Data de Início" name="data_inicio" rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}>
                            <Input type="date" name="data_inicio" style={{width: 'fit-content'}}/>
                        </Form.Item>

                        <Form.Item label="Data de Término" name="data_termino" rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}>
                            <Input type="date" name="data_termino" style={{width: 'fit-content'}}/>
                        </Form.Item>
                    </div>
                </div>
            
                <div style={{flex: '1'}}> 
                    <Form.Item label="Status" name="status" style={{ flex: "1"}} rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}>
                        <Select options={optionsStatusIteracoes} defaultValue="Selecione"/>
                    </Form.Item>
            
                    <Form.Item label="Fase" name="fase" style={{ flex: "1"}} rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}>
                        <Select options={optionsEtapas} defaultValue="Selecione" />
                    </Form.Item>

                    <Form.Item label="Líder" name="lider" style={{ flex: "1"}} rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}>
                        <Select options={optionsMembros} defaultValue="Selecione" />
                    </Form.Item>
                </div>
            </div>
                  
            <Form.Item>
                <Button style={{marginRight: '10px'}} type="primary" htmlType="submit"> Salvar </Button>
                <Button onClick={onCancel} type="primary" danger> Cancelar </Button>
            </Form.Item>
        </Form>
    )
}

export default FormIteracao
