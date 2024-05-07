import React from "react";
import './FormComentario.css'
import { Button, Form, Input } from "antd";
import { FaCircleUser } from "react-icons/fa6";
import { useForm } from "antd/es/form/Form";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";

                
const FormComentario = ({onSubmit, onCancel}) => {

    const [form] = useForm()
    const {autor} = useContextoGlobalProjeto()

    const handleSubmitForm = (values) => {

    }

    return (

        <Form form={form} className="form-comments" layout="vertical" onFinish={onSubmit}>

            <div>
                <FaCircleUser size="25px" />
            </div>

            <div style={{flex: '1'}}>

                <Form.Item name="texto">
                    <Input.TextArea rows={4} name="texto" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Comentar
                    </Button>

                    <Button onClick={onCancel}>
                        Cancelar
                    </Button>
                </Form.Item>
            </div>
            

        </Form>
 
    )
}
        

export default FormComentario