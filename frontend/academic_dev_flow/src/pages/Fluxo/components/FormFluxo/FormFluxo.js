import { Button, Form, Input } from "antd";
import React from "react";
import BotaoVoltar from "../../../../components/Botoes/BotaoVoltar/BotaoVoltar";

const FormFluxo = ({onSubmit, onBack, valoresIniciais}) => {

    const [form] = Form.useForm()

    const handleSubmeterForm = async () => {
        const dados = form.getFieldsValue()
        await onSubmit(dados)
    }   

    return (
        <div className="global-form">
            <div> 
                <BotaoVoltar funcao={onBack}/>
            </div>
            <h4>CADASTRAR FLUXO</h4>
            <Form
                name="myForm"
                layout="vertical"
                form = {form}
                labelCol={{
                    span: 4,
                  }}
                  wrapperCol={{
                    span: 14,
                  }}
                initialValues={valoresIniciais}               
            >
                <Form.Item name="nome" label="Nome">
                    <Input placeholder="Ex.: Modelo Scrum"/>
                </Form.Item>

                <Form.Item name="descricao" label="Descrição">
                    <Input.TextArea 
                        style={{height: '150px'}} 
                        placeholder="Este fluxo de desenvolvimento ..." 
                        
                    />
                </Form.Item>
                
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px"
                }}>
                    <Button type="primary" onClick={handleSubmeterForm}> 
                        Salvar
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default FormFluxo