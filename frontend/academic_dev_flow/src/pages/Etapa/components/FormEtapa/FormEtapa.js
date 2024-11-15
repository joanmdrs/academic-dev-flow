import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useContextoEtapa } from "../../context/ContextoEtapa";

const FormEtapa = ({onSubmit, onCancel}) => {

    const [form] = Form.useForm();
    const {dadosEtapa} = useContextoEtapa()
    const [titulo, setTitulo] = useState('CADASTRAR ETAPA')

    useEffect(() => {

        if (dadosEtapa !== null){
            form.setFieldsValue(dadosEtapa)
            setTitulo('ATUALIZAR ETAPA')
        } else {
            form.resetFields()
            setTitulo('CADASTRAR ETAPA')
        }
        
    }, []);

    return (
        <Form
            className="global-form"
            layout="vertical" 
            form={form} 
            onFinish={onSubmit} 
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}
        >
            <Form.Item>
                <h4> {titulo} </h4>
            </Form.Item>

            <Form.Item 
                label="Nome" 
                name="nome"
                rules={[{ required: true, message: 'Por favor, insira o nome da etapa!' }]}
            >
                <Input placeholder="nome da etapa"/>
            </Form.Item>
            <Form.Item 
                label="Descrição" 
                name="descricao" 
            >
                <Input.TextArea
                    rows={8}
                    placeholder="descrição da etapa"
                />
            </Form.Item>

            <div style={{display: 'flex', gap: '10px' }}>
                <Button type="primary" htmlType="submit">Salvar</Button>
                <Button type="primary" danger onClick={onCancel}>Cancelar</Button>
            </div>
        </Form>
    )
}

export default FormEtapa;