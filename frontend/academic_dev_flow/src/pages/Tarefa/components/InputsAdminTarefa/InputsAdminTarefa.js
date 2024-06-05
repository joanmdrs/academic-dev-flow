import { Form, Input, InputNumber } from "antd";
import React from "react";

const InputsAdminTarefa = () => {


    return (
        <>
            <Form.Item
                name="tempo_gasto"
                label="Tempo Gasto"
            >
                <InputNumber />
            </Form.Item>

            <Form.Item
                name="number_issue"
                label="Número da Issue"
            >
                <InputNumber />
            </Form.Item>

            <Form.Item
                name="url_issue"
                label="Url da Issue"
            >
                <Input type="url" />
            </Form.Item>
        </>
    )
}

export default InputsAdminTarefa