import React from "react";
import {Button, Form, Input, } from "antd";
import { useFormContext } from "../../../context/Provider/FormProvider";

const TabFormFluxo = () => {

    const {
            setHasDadosFluxo,
            setCurrent} = useFormContext();

    const [form] = Form.useForm()

    const handleAlteracoesInput = () => {
        const dadosForm = form.getFieldsValue()
        const dadosFluxo = {
            nome: dadosForm.nome, 
            descricao: dadosForm.descricao
        }
        setHasDadosFluxo(dadosFluxo)
    }
    
    

    const handleCliqueBotaoCancelar = () => {

    }

    return (
        <div className="form-box" style={{
            maxWidth: 800
        }}>
            <h4>CADASTRAR FLUXO</h4>
            <Form
                name="myForm"
                layout="vertical"
                form = {form}               
            >
                <Form.Item name="nome" label="Nome">
                    <Input placeholder="Ex.: Modelo Scrum" onChange={handleAlteracoesInput}/>
                </Form.Item>

                <Form.Item name="descricao" label="Descrição">
                    <Input.TextArea style={{height: '150px'}} placeholder="Este fluxo de desenvolvimento ..." onChange={handleAlteracoesInput}/>
                </Form.Item>
                
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px"
                }}>
                    <Button> 
                        Cancelar
                    </Button>
                    <Button type="primary" onClick={() => setCurrent("2")}> 
                        Avançar
                    </Button>
                </div>
                
            </Form>
        </div>
    )
    
}

export default TabFormFluxo;