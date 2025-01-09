import { Button, Form, Input, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import React from "react";

const FormFiltrarEtapas = ({onFilter, onCancel}) => {

    const [form] = useForm()

    return (
        <Form form={form} className="global-form" layout="vertical" onFinish={onFilter}>
            <Form.Item label="Filtrar Etapas" name="nome">
                <Input name="nome" placeholder="Pesquise pelo nome da etapa"/>
            </Form.Item>

            <Space>
                <Button onClick={() => onCancel()}> Cancelar </Button>
                <Button type="primary" htmlType="submit"> Filtrar </Button>
            </Space>
        </Form>
    )
}

export default FormFiltrarEtapas