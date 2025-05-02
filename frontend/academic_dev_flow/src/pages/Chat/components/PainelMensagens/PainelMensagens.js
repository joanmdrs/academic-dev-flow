import { Form, Input, Modal } from 'antd';
import './PainelMensagens.css';
import React, { useEffect, useRef, useState } from "react";
import { atualizarMensagemDoChat, buscarMensagensDoChat, cadastrarMensagemNoChat, excluirMensagemDoChat } from '../../../../services/chatService';
import { useContextoChat } from '../../context/ContextoChat';
import ListMensagens from '../ListMensagens/ListMensagens';
import ModalEditMensagem from '../ModalEditMensagem/ModalEditMensagem';

const PainelMensagens = () => {
    const [mensagens, setMensagens] = useState([]);
    const { chatSelecionado, mensagemToUpdate, setMensagemToUpdate } = useContextoChat();
    const [form] = Form.useForm();
    const [isModalEditVisible, setIsModalEditVisible] = useState(false)

    const mensagensFimRef = useRef(null);

    const handleBuscarMensagensDoChat = async () => {
        const response = await buscarMensagensDoChat(chatSelecionado.id);
        if (!response.error) {
            setMensagens(response.data);
        }
    };

    useEffect(() => {
        if (chatSelecionado) {
            handleBuscarMensagensDoChat();
        }
    }, [chatSelecionado]);

    useEffect(() => {
        // Rola até o fim sempre que mensagens mudarem
        mensagensFimRef.current?.scrollIntoView({ block: 'end' });
    }, [mensagens]);

    const handleReload = async () => {
        await handleBuscarMensagensDoChat()
        setMensagemToUpdate(null)
        setIsModalEditVisible(false)
    }

    const handleCriarMensagem = async (values) => {
        const { conteudo } = values;
        if (!conteudo || conteudo.trim() === '') return;

        await cadastrarMensagemNoChat({ conteudo, chat: chatSelecionado.id });
        await handleBuscarMensagensDoChat();
        form.resetFields();
    };

    const handleCloseModal = () => {
        setIsModalEditVisible(false)
        setMensagemToUpdate(null)
    }

    const handleEditarMensagem = (record) => {
        console.log("conteudo da mensagem: ", record)
        setMensagemToUpdate(record)
        setIsModalEditVisible(true)
    }

    const handleAtualizarMensagem  = async (data) => {
        const mensagemUpdated = mensagemToUpdate
        mensagemUpdated['conteudo'] = data.conteudo

        const response = await atualizarMensagemDoChat(mensagemToUpdate.id, mensagemUpdated)


        if (!response.error){
            await handleReload()
        }

    }

    const handleExcluirMensagem = async (idMensagem) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir essa mensagem ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                await excluirMensagemDoChat(idMensagem)
                await handleReload()
            }
        });
    }

    return (
        <div className="component-painel-mensagens">
            <div className="linha-mensagens">
                <ListMensagens data={mensagens} onEdit={handleEditarMensagem} onDelete={handleExcluirMensagem}/>
                <div ref={mensagensFimRef} />
            </div>

            <div className="form-cadastrar-mensagem-no-chat">
                <Form form={form} onFinish={handleCriarMensagem}>
                    <Form.Item 
                        name="conteudo"
                        rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                    >
                        <Input 
                            size="large" 
                            placeholder="Digite sua mensagem"
                        />
                    </Form.Item>
                </Form>
            </div>

            <ModalEditMensagem 
                visible={isModalEditVisible} 
                onCancel={handleCloseModal}
                onOk={handleAtualizarMensagem}
            />
        </div>
    );
};

export default PainelMensagens
