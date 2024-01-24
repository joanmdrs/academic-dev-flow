import React from "react";
import {Button, Form, Input, } from "antd";
import { useFormContext } from "../../../context/Provider/FormProvider";
import { atualizarFluxo, criarFluxo } from "../../../../../services/fluxo_service";
import { NotificationManager } from "react-notifications";

const TabFormFluxo = () => {

    const { hasDadosFluxo, setHasDadosFluxo, acaoFormFluxo, setAcaoFormFluxo } = useFormContext();

    const [form] = Form.useForm()
    
    const handleCriarFluxo = async () => {
        const dadosForm = form.getFieldsValue();
        console.log(dadosForm)
        try {
            const dadosForm = form.getFieldsValue();
            const resposta = await criarFluxo(dadosForm);
            
            if (resposta.status === 200) {
                setHasDadosFluxo(resposta.data)
                setAcaoFormFluxo('atualizar')
                NotificationManager.success('Fluxo criado com sucesso!');
            } else {
                NotificationManager.error('Falha ao criar o fluxo, contate o suporte!');
            }
        } catch (error) {
            console.error("Ocorreu um erro:", error);
            NotificationManager.error('Ocorreu um problema durante a operação, contate o suporte!');
        }

        console.log(hasDadosFluxo)
    }

    const handleAtualizarFluxo = async () => {

        try {
            const dadosForm = form.getFieldsValue()
            const resposta = await atualizarFluxo(dadosForm, hasDadosFluxo.id); 

            if(resposta.status === 200){
                setHasDadosFluxo(resposta.data)
                NotificationManager.success('Fluxo atualizado com sucesso!')
            } else {
                NotificationManager.error('Falhar ao atualizar o fluxo, contate o suporte!');
            }
        } catch (error) {
            console.error("Ocorreu um erro:", error);
            NotificationManager.error('Ocorreu um problema durante a operação, contate o suporte!');
        }
    }

    const handleSubmeterForm = async () => {

        if (acaoFormFluxo === 'criar'){
            await handleCriarFluxo()
        } else if (acaoFormFluxo === 'atualizar'){
            await handleAtualizarFluxo()
        }
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
                    <Input placeholder="Ex.: Modelo Scrum"/>
                </Form.Item>

                <Form.Item name="descricao" label="Descrição">
                    <Input.TextArea style={{height: '150px'}} placeholder="Este fluxo de desenvolvimento ..." />
                </Form.Item>

                <Button type="primary" onClick={handleSubmeterForm}> 
                    Salvar
                </Button>
            </Form>
        </div>
    )
    
}

export default TabFormFluxo;