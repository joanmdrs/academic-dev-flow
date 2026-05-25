import React, { useEffect, useCallback, useState } from "react";
import "./PainelChat.css";

import { Button, Modal, message } from "antd";
import { FaPlus } from "react-icons/fa6";

import SelectProject from "../../../../components/SelectProject/SelectProject";
import FormChatModal from "../../components/FormChat/FormChat";
import RenderEmpty from "../../../../components/Empty/Empty";
import SpinLoading from "../../../../components/SpinLoading/SpinLoading";

import ListChats from "../../components/ListChats/ListChats";
import PainelMensagens from "../../components/PainelMensagens/PainelMensagens";

import {
    atualizarChat,
    buscarChatsDoUsuario,
    cadastrarChat,
    excluirChat
} from "../../../../services/chatService";

import { useContextoChat } from "../../context/ContextoChat";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { useAuth } from "../../../../hooks/AuthProvider";

const PainelChat = () => {
    const {
        dadosChat,
        setDadosChat,
        chatSelecionado,
        setChatSelecionado
    } = useContextoChat();

    const { setDadosProjeto } = useContextoGlobalProjeto();

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [actionForm, setActionForm] = useState("create");
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { user } = useAuth();

    const limparFormulario = () => {
        setIsFormVisible(false);
        setChatSelecionado(null);
        setDadosProjeto(null);
        setDadosChat(null);
        setActionForm("create");
    };

    const handleBuscarChats = useCallback(async () => {
        if (!user?.id) return;

        setIsLoading(true);

        try {
            const response = await buscarChatsDoUsuario(user.id);

            if (!response.error) {
                setChats(response.data || []);
            } else {
                message.error("Não foi possível carregar os chats.");
            }
        } catch (error) {
            message.error("Erro ao buscar os chats do usuário.");
        } finally {
            setIsLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        handleBuscarChats();
    }, [handleBuscarChats]);

    const handleReload = async () => {
        await handleBuscarChats();
        limparFormulario();
    };

    const handleAdicionarChat = () => {
        setIsFormVisible(true);
        setChatSelecionado(null);
        setDadosProjeto(null);
        setDadosChat(null);
        setActionForm("create");
    };

    const handleEditarChat = (record) => {
        setIsFormVisible(true);
        setActionForm("update");
        setDadosChat(record);
        setChatSelecionado(null);
    };

    const handleSalvarChat = async (data) => {
        try {
            if (actionForm === "create") {
                await cadastrarChat(data);
                message.success("Chat criado com sucesso.");
            } else if (actionForm === "update" && dadosChat?.id) {
                await atualizarChat(dadosChat.id, data);
                message.success("Chat atualizado com sucesso.");
            }

            await handleReload();
        } catch (error) {
            message.error("Não foi possível salvar o chat.");
        }
    };

    const handleExcluirChat = async (idChat) => {
        Modal.confirm({
            title: "Confirmar exclusão",
            content:
                "Você tem certeza de que deseja excluir este chat? Esta ação também excluirá todas as mensagens relacionadas a ele.",
            okText: "Sim",
            cancelText: "Não",
            okType: "danger",
            onOk: async () => {
                try {
                    await excluirChat(idChat);
                    message.success("Chat excluído com sucesso.");
                    await handleReload();
                } catch (error) {
                    message.error("Não foi possível excluir o chat.");
                }
            }
        });
    };

    const handleSelecionarChat = (chat) => {
        setChatSelecionado(chat);
    };

    const handleCloseModal = () => {
        setIsFormVisible(false);
    };

    const renderConteudoMensagens = () => {
        if (chats.length === 0) {
            return <RenderEmpty title="Você não possui nenhum chat criado." />;
        }

        if (!chatSelecionado) {
            return <RenderEmpty title="Selecione um chat para exibir as mensagens." />;
        }

        return <PainelMensagens />;
    };

    return (
        <div className="painel-chat">
            {isLoading ? (
                <SpinLoading />
            ) : (
                <>
                    <div className="coluna-chat">

                        <div className="cabecalho-chat">
                            <h2>Chats</h2>
                            <p>Gerencie suas conversas</p>
                        </div>
                        
                        <Button
                            type="primary"
                            icon={<FaPlus />}
                            onClick={handleAdicionarChat}
                        >
                            Criar Chat
                        </Button>

                        <ListChats
                            data={chats}
                            onEdit={handleEditarChat}
                            onDelete={handleExcluirChat}
                            onSelect={handleSelecionarChat}
                        />
                    </div>

                    <div className="coluna-mensagens">
                        {renderConteudoMensagens()}
                    </div>

                    <FormChatModal
                        visible={isFormVisible}
                        action={actionForm}
                        onOk={handleSalvarChat}
                        onCancel={handleCloseModal}
                        selectProject={<SelectProject idMembro={user?.id} />}
                    />
                </>
            )}
        </div>
    );
};

export default PainelChat;