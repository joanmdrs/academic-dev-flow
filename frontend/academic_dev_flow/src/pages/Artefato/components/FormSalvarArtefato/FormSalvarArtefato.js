import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import BotaoVoltar from "../../../../components/Botoes/BotaoVoltar/BotaoVoltar";
import { atualizarArtefato, criarArtefato } from "../../../../services/artefato_service";
import { NotificationManager } from "react-notifications";
import { recarregarPagina } from "../../../../services/utils";

const PaginaCadastrarArtefato = ({onCancel, acaoForm, dados_linha}) => {

    const [form] = Form.useForm();
    
    useEffect(() => {
        form.setFieldsValue(dados_linha);
    }, []);

    const handleCriarArtefato = async (dados) => {

        try {
            const resposta = await criarArtefato(dados)

            if(resposta.status === 200){
                NotificationManager.success("Artefato criado com sucesso!");
                recarregarPagina()
            } else {
                NotificationManager.error("Ocorreu um problema, contate o suporte!");
            }
        } catch (error) {
            NotificationManager.error("Ocorreu um problema, contate o suporte!");
        }
    }

    const handleAtualizarArtefato = async (dados) => {
        
        const dados_atualizados = { 
            nome: dados.nome, 
            descricao: dados.descricao
        }

        const id_artefato = dados_linha.id
        
        try {
            const resposta = await atualizarArtefato(dados_atualizados, id_artefato)

            if(resposta.status === 200) {
                NotificationManager.success("Artefato atualizado com sucesso!");
                recarregarPagina()
            } else {
                NotificationManager.error("Ocorreu um problema, contate o suporte!");
            }
        } catch (error) {
            NotificationManager.error("Ocorreu um problema, contate o suporte!");
        }
    }

    const handleSubmeterFormulario = async () => {

        const dados_form = form.getFieldsValue();

        if (acaoForm === "criar") {
            await handleCriarArtefato(dados_form)

        } else if (acaoForm === "atualizar") {
            await handleAtualizarArtefato(dados_form)
        }
    }

    return (
        <div> 
            <Titulo 
                titulo='Artefatos'
                paragrafo='Artefatos > Cadastrar artefatos'
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