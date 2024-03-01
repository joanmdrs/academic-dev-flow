import { Button, Form, Input, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { useFormContext } from "../../../context/Provider/Provider";

const { Option } = Select;

const TabProjeto = ({ onSubmit, onCancel }) => {

    const {hasProjeto, setHasProjeto} = useFormContext()
    const [carregando, setCarregando] = useState(false);

    const [valoresIniciais, setValoresIniciais] = useState({})

    const [form] = Form.useForm();

    useEffect(() => {
        const fetchData = async () => {
        try {
            setCarregando(true);
            await new Promise((resolve) => setTimeout(resolve, 1500));
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

    const handleSubmeterForm = async () => {
        const dados = form.getFieldsValue()
        await onSubmit(dados)
    } 

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
                        layout="horizontal"
                        style={{marginTop: "20px"}}
                        className="box"
                        initialValues={valoresIniciais}
                    
                    >
                        <Form.Item label="Nome" name="nome">
                            <Input
                                id="input-nome"
                                name="nome"
                            />
                        </Form.Item>

                        <Form.Item label="Status" name="status" style={{maxWidth: 250}}>
                                <Select
                                    id="status"
                                    name="status"
                                >
                                    <Option value="">Selecione</Option>
                                    <Option value="cancelado">Cancelado</Option>
                                    <Option value="em_andamento">Em andamento</Option>
                                    <Option value="concluido">Concluído</Option>
                                </Select>
                        </Form.Item>

                        <Form.Item label="Data de Início" name="data_inicio" style={{ maxWidth: 250, float: 'left', marginRight: '10px' }}>
                            <Input id="data_inicio" name="data_inicio" type="date" />
                        </Form.Item>

                        <Form.Item label="Data de Término" name="data_fim" style={{ maxWidth: 250, float: 'left' }}>
                            <Input id="data_fim" name="data_fim" type="date" />
                        </Form.Item>

                        <Form.Item label="Descrição" name="descricao" style={{ clear: 'both' }}>
                            <Input.TextArea id="descricao" name="descricao" rows={6} />
                        </Form.Item>

                        <div className="tabs-projeto-footer-botoes">
                            <Button type="primary" onClick={handleSubmeterForm}>
                                SALVAR
                            </Button >

                            <Button type="primary" onClick={onCancel} danger >
                                CANCELAR
                            </Button>
                            </div>

                    </Form>
                </React.Fragment>
            ) }
        </React.Fragment>      
    ) 
    

}

export default TabProjeto;