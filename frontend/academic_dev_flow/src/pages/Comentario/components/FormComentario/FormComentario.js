import React, { useEffect } from "react";
import './FormComentario.css'
import { Button, Form, Input } from "antd";
import { FaCircleUser } from "react-icons/fa6";
import { useForm } from "antd/es/form/Form";
import { useContextoComentario } from "../../context/ContextoComentario";

                
const FormComentario = ({onSubmit, onCancel, titulo}) => {

    const [form] = useForm()
    const {dadosComentario} = useContextoComentario()

    const handleSubmitForm = (values) => {
        onSubmit(values)
        form.resetFields()
    }

    useEffect(() => {
        const fetchData = async () => {
            if (dadosComentario !== null){
                form.setFieldsValue(dadosComentario)
            }
        }

        fetchData()
    }, [])

    return (

        <Form form={form} layout="vertical" onFinish={handleSubmitForm}>

            <Form.Item>
                <h4> {titulo} </h4>
            </Form.Item>

            <Form.Item name="texto">
                <Input.TextArea rows={4} name="texto" placeholder="comentário ..." />
            </Form.Item>

            <div style={{display: 'flex', gap: '10px'}}> 

                <Button type="primary" htmlType="submit">
                    Comentar
                </Button>

                <Button onClick={onCancel}>
                    Cancelar
                </Button>

            </div>           

        </Form>
 
    )
}
        

export default FormComentario