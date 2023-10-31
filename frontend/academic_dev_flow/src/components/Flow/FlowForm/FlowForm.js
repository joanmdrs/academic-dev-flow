import React from "react";
import "./FlowForm.css";
import {Form, Input, } from "antd";
import { useForm } from "antd/es/form/Form";
import { useFormContext } from "../FormProvider/FormProvider";

const FlowForm = () => {

    const { setFlowDetails } = useFormContext();

    const [form] = useForm()

    const handleInputChange = () => {
        const values = form.getFieldValue();
        
    
        setFlowDetails({
            nome: values.nome,
            descricao: values.descricao
        })
    }
    
    return (
        <div className="form-add-flow">
            <h4>Cadastrar fluxo</h4>
            <Form
                name="myForm"
                className="myform"
                layout="vertical"
                form = {form}
            >
                <Form.Item name="nome" label="Nome">
                    <Input onChange={handleInputChange} />
                </Form.Item>

                <Form.Item name="descricao" label="Descrição">
                    <Input.TextArea onChange={handleInputChange}/>
                </Form.Item>
            </Form>
        </div>
    )
    
}

export default FlowForm;