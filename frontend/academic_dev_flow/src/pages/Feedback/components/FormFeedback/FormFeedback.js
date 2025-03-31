import { Button, Form, Input, Radio, Select, Space } from "antd";
import React, { useEffect } from "react";
import { useContextoFeedback } from "../../context/ContextoFeedback";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import { optionsStatusFeedback, optionsTiposFeedbacks } from "../../../../services/optionsStatus";
import { filterOption } from "../../../../services/utils";

const FormFeedback = ({onSubmit, onCancel}) => {

    const [form] = Form.useForm();
    const {dadosFeedback} = useContextoFeedback()
    const {grupo} = useContextoGlobalUser()

    useEffect(() => {

        if (dadosFeedback !== null){
            form.setFieldsValue(dadosFeedback)
        } else {
            form.resetFields()
        }
        
    }, []);

    return (
        <Form
            className="global-form"
            layout="vertical" 
            form={form} 
            onFinish={onSubmit} 
        >
            <Form.Item 
                label="Título" 
                name="titulo"
                rules={[{ required: true, message: 'Por favor, insira um título!' }]}
            >
                <Input placeholder="título"/>
            </Form.Item>
            <Form.Item 
                label="Descrição" 
                name="descricao" 
                rules={[{ required: true, message: 'Por favor, insira uma descrição!' }]}
            >
                <Input.TextArea
                    rows={8}
                    placeholder="descrição"
                />
            </Form.Item>

            <Form.Item
                label="Tipo"
                name="tipo"
                rules={[{ required: true, message: 'Por favor, seleicone um tipo!' }]}
            > 
                <Select 
                    style={{width: '50%'}} 
                    name="tipo" 
                    placeholder={"Selecione um tipo"} 
                    options={optionsTiposFeedbacks}
                    filterOption={filterOption}
                />
            </Form.Item>

            {grupo === "Docentes" || grupo === "Administradores" ? (
                <Form.Item 
                    label="Status" 
                    name="status"
                    rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                >
                    <Select 
                        style={{ width: '50%' }}
                        options={optionsStatusFeedback} 
                        name="status" 
                        placeholder="Selecione o status" 
                    />
                </Form.Item>
            ) : null}

            <Space>
                <Button type="primary" htmlType="submit">Salvar</Button>
                <Button type="primary" danger onClick={onCancel}>Cancelar</Button>
            </Space>
        </Form>
    )
}

export default FormFeedback;