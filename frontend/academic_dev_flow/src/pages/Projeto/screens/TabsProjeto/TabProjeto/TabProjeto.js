import { Button, Form, Input, Select, Spin, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { useContextoProjeto } from "../../../context/ContextoProjeto";
import { optionsStatusProjetos } from "../../../../../services/optionsStatus";


const customizeRequiredMark = (label, { required }) => (
    <>
        {label}
        {required ? null : <Tag style={{marginLeft: "5px"}} color="warning">Opcional </Tag> }
    </>
  );

const TabProjeto = ({ onSubmit, onCancel }) => {

    const {hasProjeto} = useContextoProjeto()
    const [carregando, setCarregando] = useState(false);

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
                        className="global-form"  
                        onFinish={onSubmit}
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
                                rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                            >
                                <Input name="data_inicio" type="date" />
                            </Form.Item>

                            <Form.Item 
                                label="Data de Término:" 
                                name="data_fim" 
                                style={{width: "250px"}} 
                                rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                            >
                                <Input name="data_fim" type="date" />
                            </Form.Item>

                        </div>

                        <Form.Item label="Descrição:" name="descricao">
                            <Input.TextArea id="descricao" name="descricao" rows={6} />
                        </Form.Item>

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

                        <div style={{display: 'flex', gap: "10px"}} >
                            <Button type="primary" htmlType="submit">
                                Salvar
                            </Button >

                            <Button type="primary" onClick={onCancel} danger >
                                Cancelar
                            </Button>
                        </div>

                    </Form>
                </React.Fragment>
            ) }
        </React.Fragment>      
    ) 
    

}

export default TabProjeto;