import { Button, Form, Input } from "antd";
import React from "react";
import Title from "../../components/Title/Title";
import BotaoVoltar from "../../components/Buttons/BotaoVoltar/BotaoVoltar";

const PaginaCadastrarArtefato = ({onCancel}) => {
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
                    <Form layout="vertical">
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
                    <Button type="primary">Salvar</Button>
        
                </div>
            </div>

        </div>
    )
}

export default PaginaCadastrarArtefato;