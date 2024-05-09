import { Button, Form, Input } from "antd";
import React from "react";

const FormFiltrarArtefatos = ({onSearch, onClear}) => {

    return (
        <Form layout="vertical" onFinish={onSearch}> 
            <Form.Item label='Nome' name='nome'>
                <Input name="nome" placeholder="nome"/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Filtrar
                </Button>

                <Button style={{marginLeft: '10px'}} onClick={() => onClear()}>
                    Limpar
                </Button>
            </Form.Item>
        </Form>
    )
}

export default FormFiltrarArtefatos