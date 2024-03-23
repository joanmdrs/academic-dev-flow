import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import { useProjetoContext } from "../../../context/ProjetoContext";

const FormPontuacao = ({onSubmit, onCancel}) => {
    
    const {dadosDocumento} = useProjetoContext()
    return (
        <Form className="global-form" onFinish={onSubmit}>

            <Form.Item>
                <h4 style={{margin: 0}}> 
                    REGISTRAR PONTUAÇÃO - <span style={{color: "var(--primary-color)"}}>{dadosDocumento.titulo} </span>
                </h4>
            </Form.Item>

            <Form.Item label="Nota" name="nota">
                <Input name="nota" style={{width: 'fit-content'}} />
            </Form.Item>

            <Form.Item label="Comentário" name="comentario"  >
                <Input.TextArea name="comentario" rows={4} style={{width: '50%'}} />
            </Form.Item>

            <Form.Item label="Liberar" name="disponivel">
                <Checkbox name="disponivel" />
            </Form.Item>

            <Form.Item >
                <Button style={{marginRight: '10px'}} type="primary" htmlType="submit"> Salvar </Button>
                <Button  onClick={onCancel}> Cancelar </Button>
            </Form.Item>
        </Form>
    )
}

export default FormPontuacao