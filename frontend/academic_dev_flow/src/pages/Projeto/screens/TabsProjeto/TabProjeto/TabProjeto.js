import { Button, Collapse, Form, Input, Select, Space, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { CaretRightOutlined, LoadingOutlined } from '@ant-design/icons';
import { useContextoProjeto } from "../../../context/ContextoProjeto";
import { optionsStatusProjetos } from "../../../../../services/optionsStatus";
const {Panel} = Collapse

const TabProjeto = ({ onSubmit, onCancel }) => {

    const {dadosProjeto} = useContextoProjeto()
    const [carregando, setCarregando] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setCarregando(true);
                form.setFieldsValue(dadosProjeto)
            } catch (error) {
            } finally {
                setCarregando(false);
            }
        };
        fetchData();
    }, [dadosProjeto, form]);



    return (

       <React.Fragment>
            { carregando ? (
                   <div style={{ textAlign: "center", padding: "20px" }}>
                        <Spin
                            indicator={
                            <LoadingOutlined
                                style={{
                                fontSize: 48,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                }}
                                spin
                            />
                            }
                        />
                    </div>
                ) : 
                (<React.Fragment>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onSubmit}
                    >
                        <Collapse
                            collapsible=""
                            bordered={false}
                            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        >
                            <Panel 
                                style={{
                                    padding: '30px', 
                                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                                    border: 'none', 
                                    marginBottom: '20px'
                                }} 
                                header="DADOS DO PROJETO" key="1"
                            >
                                <Form.Item 
                                    label="Nome:" 
                                    name="nome" 
                                    rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                                >
                                    <Input
                                        name="nome"
                                    />
                                </Form.Item>

                                <div style={{display: 'flex', gap: "20px"}}>
                                    <Form.Item 
                                        label="Status:" 
                                        name="status" 
                                        style={{width: "250px"}} 
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
                                        style={{width: "250px"}}
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
                                        style={{width: "250px"}} 
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

                                <Form.Item label="Descrição:" name="descricao">
                                    <Input.TextArea id="descricao" name="descricao" rows={6} />
                                </Form.Item>
                            </Panel>

                            <Panel style={{
                                    padding: '30px', 
                                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                                    border: 'none', 
                                    marginBottom: '20px'
                                }} 
                                header="VINCULAR AO GITHUB" 
                                key="2"
                            >
                                <Form.Item label="Informe (proprietário/repositório):" name="nome_repo">
                                    <Input name="nome_repo"/>
                                </Form.Item>

                                <Form.Item label="Link do repositório:" name="link_repo">
                                    <Input name="link_repo" />
                                </Form.Item>

                                <Form.Item label="Link do MVP:" name="link_site">
                                    <Input name="link_site" />
                                </Form.Item>

                                <Form.Item label="Token de acesso:" name="token">
                                    <Input name="token" />
                                </Form.Item>
                            </Panel>
                        </Collapse>

        

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