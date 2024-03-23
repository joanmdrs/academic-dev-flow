import { Button, Checkbox, Form, Input } from "antd";
import React from "react";

const FormPontuacao = ({onSubmit, onCancel}) => {
    

    return (
        <Form layout="vertical" onFinish={onSubmit}>
            <Form.Item label="Nota" name="nota">
                <Input name="nota" />
            </Form.Item>

            <Form.Item label="Comentário" name="comentario">
                <Input name="comentario" />
            </Form.Item>

            <Form.Item label="Disponibilizar" name="disponivel">
                <Checkbox name="disponivel" />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit"> Salvar </Button>
                <Button onClick={onCancel}> Cancelar </Button>
            </Form.Item>
        </Form>
    )
}

export default FormPontuacao