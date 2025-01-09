import { Button, Form, Input, Select, Space, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useContextoProjeto } from "../../../context/ContextoProjeto";
import { optionsStatusProjetos } from "../../../../../services/optionsStatus";
import SpinLoading from "../../../../../components/SpinLoading/SpinLoading";
import { listarFluxos } from "../../../../../services/fluxoService";

const TabProjeto = ({ onSubmit, onCancel }) => {

    const {dadosProjeto} = useContextoProjeto()
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false)
    const [optionsFluxo, setOptionsFluxo] = useState([])

    const handleListarFluxos = async () => {
        const response = await listarFluxos()
        if (!response.error){
            const resultados = response.data.map((item) => {
                return {
                    value: item.id,
                    label: item.nome
                }
            })
            setOptionsFluxo(resultados)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await handleListarFluxos()
                form.setFieldsValue(dadosProjeto)
            } catch (error) {
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [dadosProjeto]);

    return (
       <React.Fragment>
            { isLoading ? (
                   <SpinLoading />
                ) : 
                (<React.Fragment>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onSubmit}
                    >
                        <div style={{display: 'flex', gap: '20px'}}> 
                            <div style={{display: 'flex', flexDirection: 'column', flex: '2'}}>
                                <Form.Item 
                                    label="Nome:" 
                                    name="nome" 
                                    rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                                >
                                    <Input
                                        name="nome"
                                    />
                                </Form.Item>

                                <Form.Item label="Descrição:" name="descricao">
                                    <Input.TextArea id="descricao" name="descricao" rows={5} />
                                </Form.Item>
                                <Form.Item 
                                    label="Selecione o fluxo" 
                                    name="fluxo" 
                                >
                                    <Select
                                        options={optionsFluxo}
                                        showSearch
                                        allowClear
                                        placeholder="Selecione o fluxo"
                                        filterOption={
                                            (input, option) => option?.label.toLowerCase().includes(input.toLowerCase())
                                        }
                                    />
                                </Form.Item>
                            </div>
                            

                            <div style={{display: 'flex', flexDirection: 'column', flex:'1'}}>
                                <Form.Item 
                                    label="Status:" 
                                    name="status" 
                                    rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}>
                                    <Select
                                        name="status"
                                        defaultValue="Selecione"
                                        options={optionsStatusProjetos}
                                    />
                                </Form.Item>

                                <Form.Item 
                                    label="Data de Início:" 
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
                                    <Input name="data_inicio" type="date" />
                                </Form.Item>

                                <Form.Item 
                                    label="Data de Término:" 
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
                                    <Input name="data_fim" type="date" />
                                </Form.Item>
                            </div>
                        </div>
                        
                        <Space>
                            <Button type="primary" htmlType="submit"> Salvar </Button>
                            <Button type="primary" danger onClick={() => onCancel()}> Cancelar </Button>
                        </Space>
                    </Form>
                </React.Fragment>
            ) }
        </React.Fragment>      
    ) 
    

}

export default TabProjeto;