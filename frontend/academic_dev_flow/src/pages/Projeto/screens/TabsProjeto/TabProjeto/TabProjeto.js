import { Button, Collapse, Form, Input, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { CaretRightOutlined, LoadingOutlined } from '@ant-design/icons';
import { useContextoProjeto } from "../../../context/ContextoProjeto";
import { optionsStatusProjetos } from "../../../../../services/optionsStatus";
const {Panel} = Collapse

const TabProjeto = ({ onSubmit, onCancel }) => {

    const {hasProjeto} = useContextoProjeto()
    const [carregando, setCarregando] = useState(false);
    const [activeKey, setActiveKey] = useState(['1']);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setCarregando(true);
                handleAlterarCampos(hasProjeto)
            } catch (error) {
            } finally {
                setCarregando(false);
            }
        };
        fetchData();
    }, [hasProjeto]);

    const handleAlterarCampos = (dados) => {
        form.setFieldsValue(dados)
    }

    const handleCollapseChange = (key) => {
        setActiveKey(key); 
    };

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
                            bordered={true}
                            style={{padding: '30px', borderRadius: '0', backgroundColor: "#FFFFFF"}} 
                            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                            activeKey={activeKey}
                            onChange={handleCollapseChange}
                        >
                            <Panel header="DADOS DO PROJETO" key="1">
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
                                        rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                                    >
                                        <Input name="data_inicio" type="date" />
                                    </Form.Item>

                                    <Form.Item 
                                        label="Data de Término:" 
                                        name="data_termino" 
                                        style={{width: "250px"}} 
                                        rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                                    >
                                        <Input name="data_fim" type="date" />
                                    </Form.Item>

                                </div>

                                <Form.Item label="Descrição:" name="descricao">
                                    <Input.TextArea id="descricao" name="descricao" rows={6} />
                                </Form.Item>
                            </Panel>
                        </Collapse>

                        <Collapse
                            bordered={true}
                            style={{marginBottom: '20px', padding: '30px', borderRadius: '0', backgroundColor: '#FFFFFF'}} 
                            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                            activeKey={activeKey}
                            onChange={handleCollapseChange}
                        >
                            <Panel header="VINCULAR AO GITHUB" key="2">
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
                                                
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Salvar
                            </Button>

                            <Button style={{ marginLeft: "10px" }} type="primary" onClick={onCancel} danger >
                                Cancelar
                            </Button>
                        </Form.Item> 

                    </Form>
                </React.Fragment>
            ) }
        </React.Fragment>      
    ) 
    

}

export default TabProjeto;