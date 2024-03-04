import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import BotaoVoltar from "../../../../components/Botoes/BotaoVoltar/BotaoVoltar";
import { NotificationManager } from "react-notifications";
import { recarregarPagina } from "../../../../services/utils";
import { atualizarEtapa, criarEtapa } from "../../../../services/etapaService";
import { useNavigate } from "react-router-dom";

const ScreenSalvarEtapa = ({acaoBotaoVoltar, acaoForm, etapaSelecionada}) => {

    const [form] = Form.useForm();
    const navigate = useNavigate();
    
    useEffect(() => {
        form.setFieldsValue(etapaSelecionada);
    }, []);

    const handleCriarEtapa = async (dados) => {

        try {
            const resposta = await criarEtapa(dados)

            if(resposta.status === 200){
                NotificationManager.success("Etapa criada com sucesso!");
                recarregarPagina()
            } else {
                NotificationManager.error("Ocorreu um problema, contate o suporte!");
            }
        } catch (error) {
            NotificationManager.error("Ocorreu um problema, contate o suporte!");
        }
    }

    const handleAtualizarEtapa = async (dados) => {
        
        const dadosAtualizados = { 
            nome: dados.nome, 
            descricao: dados.descricao
        }

        const idEtapa = etapaSelecionada.id
        
        try {
            const resposta = await atualizarEtapa(dadosAtualizados, idEtapa)

            if(resposta.status === 200) {
                NotificationManager.success("Etapa atualizada com sucesso!");
                recarregarPagina()
            } else {
                NotificationManager.error("Ocorreu um problema, contate o suporte!");
            }
        } catch (error) {
            NotificationManager.error("Ocorreu um problema, contate o suporte!");
        }
    }

    const handleSubmeterFormulario = async () => {

        const dadosForm = form.getFieldsValue();

        if (acaoForm === "criar") {
            await handleCriarEtapa(dadosForm)

        } else if (acaoForm === "atualizar") {
            await handleAtualizarEtapa(dadosForm)
        }
    }

    return (
        <div> 
            <Titulo 
                titulo='Etapas'
                paragrafo='Etapas > Cadastrar etapas'
            />

            <div className="global-div"> 
                <div> 
                    <BotaoVoltar funcao={acaoBotaoVoltar} />
                </div>

                <div> 
                    <h4>INCLUIR ETAPA</h4>
                </div>

                <div className="global-form"> 
                    <Form layout="vertical" form={form}>
                        <Form.Item 
                            label="Nome" 
                            name="nome"
                            style={{width: "50%"}}
                            rules={[{ required: true, message: 'Por favor, insira o nome da etapa!' }]}
                        >
                            <Input placeholder="Ex.: Elicitação de requisitos"/>
                        </Form.Item>
                        <Form.Item 
                            label="Descrição" 
                            name="descricao" 
                            rules={[{required: true, message: 'Por favor, insira a descrição da etapa!'}]}
                        >
                            <Input.TextArea
                                rows={8}
                                placeholder="Ex.: Esta etapa ..."
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

export default ScreenSalvarEtapa;