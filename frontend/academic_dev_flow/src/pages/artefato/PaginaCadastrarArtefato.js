import { Button, Form, Input } from "antd";
import React from "react";
import Title from "../../components/Title/Title";
import BotaoVoltar from "../../components/Buttons/BotaoVoltar/BotaoVoltar";
import { useForm } from "antd/es/form/Form";
import { criarArtefato } from "../../services/artefato_service";
import { NotificationManager } from "react-notifications";

const PaginaCadastrarArtefato = ({onCancel, acaoForm, setAcaoForm}) => {

    const [form] = Form.useForm();

    const handleCriarArtefato = async () => {

        const dados_form = form.getFieldsValue();

        try {
            const resposta = await criarArtefato(dados_form)

            if(resposta.status === 200){
                NotificationManager.success("Artefato criado com sucesso!");
            } else {
                NotificationManager.error("Ocorreu um problema, contate o suporte!");
            }
        } catch (error) {
            NotificationManager.error("Ocorreu um problema, contate o suporte!");
        }
    }

    const handleSubmeterFormulario = async () => {
         
        if (acaoForm === "criar") {
            await handleCriarArtefato()
        }
    }
    return (
        <div> 
            <Title 
                title='Artefatos'
                paragraph='Artefatos > Cadastrar artefatos'
            />

            <div className="form-box"> 
                <div> 
                    <BotaoVoltar onClick={onCancel} />
                </div>

                <div> 
                    <h4>INCLUIR DISCIPLINA</h4>
                </div>

                <div> 
                    <Form layout="vertical" form={form}>
                        <Form.Item 
                            label="Nome" 
                            name="nome"
                            style={{width: "50%"}}
                            rules={[{ required: true, message: 'Por favor, insira o nome do artefato!' }]}
                        >
                            <Input placeholder="Ex.: Documento de Visão"/>
                        </Form.Item>
                        <Form.Item 
                            label="Descrição" 
                            name="descricao" 
                            rules={[{required: true, message: 'Por favor, insira a descrição do artefato!'}]}
                        >
                            <Input.TextArea
                                rows={8}
                                placeholder="Ex.: Este artefato ..."
                            />
                        </Form.Item>
                    </Form>
                </div>

                <div style={{display: "flex", gap: "10px"}}>
                    <Button type="primary" onClick = {handleSubmeterFormulario}>Salvar</Button>
        
                </div>
            </div>

        </div>
    )
}

export default PaginaCadastrarArtefato;