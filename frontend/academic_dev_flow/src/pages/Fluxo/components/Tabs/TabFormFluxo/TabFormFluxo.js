import React from "react";
import {Form, Input, } from "antd";
import { useFormContext } from "../../../context/Provider/FormProvider";

const TabFormFluxo = () => {

    const { setHasDadosFluxo } = useFormContext();

    const [form] = Form.useForm()

    const handleAlteracoesInput = () => {
        const valores = form.getFieldsValue()

        setHasDadosFluxo({
            nome: valores.nome,
            descricao: valores.descricao
        })
    }
    
    return (
        <div className="form-box">
            <h4>CADASTRAR FLUXO</h4>
            <Form
                name="myForm"
                layout="vertical"
                form = {form}
            >
                <Form.Item name="nome" label="Nome">
                    <Input onChange={handleAlteracoesInput} />
                </Form.Item>

                <Form.Item name="descricao" label="Descrição">
                    <Input.TextArea onChange={handleAlteracoesInput} style={{height: '200px'}}/>
                </Form.Item>
            </Form>
        </div>
    )
    
}

export default TabFormFluxo;