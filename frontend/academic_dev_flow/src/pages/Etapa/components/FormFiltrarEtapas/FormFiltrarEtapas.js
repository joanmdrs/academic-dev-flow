import { Button, Form, Input, Space } from "antd";
import React from "react";

const FormFiltrarEtapas = ({onFilter, onCancel}) => {

    return (
        <Form className="global-form" layout="vertical" onFinish={onFilter}>
            <Form.Item label="Nome" name="nome">
                <Input name="nome" placeholder="Informe o nome da etapa"/>
            </Form.Item>

            <Space>
                <Button onClick={() => onCancel()}> Cancelar </Button>
                <Button type="primary" htmlType="submit"> Filtrar </Button>
            </Space>
        </Form>
    )
}

export default FormFiltrarEtapas