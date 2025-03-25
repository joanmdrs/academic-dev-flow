import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useContextoFluxo } from "../../context/ContextoFluxo";

const FormFluxo = ({onSubmit, onCancel}) => {

    const [form] = Form.useForm()
    const {dadosFluxo} = useContextoFluxo()
    const [titulo, setTitulo] = useState('Cadastrar Fluxo')

    useEffect(() => {
        const fetchData = async () => {
            if (dadosFluxo !== null){
                form.setFieldsValue(dadosFluxo)
                setTitulo('Atualizar Fluxo')
            } else {
                form.resetFields()
                setTitulo('Cadastrar Fluxo')
            }
        }

        fetchData()
    }, [])

    return (
        <div className="global-form">

            <Form
                layout="vertical"
                form = {form}
                labelCol={{
                    span: 4,
                }}
                
                onFinish={onSubmit}
            >
                <Form.Item name="nome" label="Nome" rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}>
                    <Input placeholder="Nome do fluxo"/>
                </Form.Item>

                <Form.Item name="descricao" label="Descrição">
                    <Input.TextArea 
                        style={{height: '150px'}} 
                        placeholder="Este fluxo de desenvolvimento ..." 
                        
                    />
                </Form.Item>
                
                <div style={{
                    display: "flex",
                    gap: '10px'
                }}>
                    <Button type="primary" htmlType="submit"> 
                        Salvar
                    </Button>

                    <Button type="primary" danger onClick={onCancel}> 
                        Cancelar
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default FormFluxo