import React, { useEffect, useState } from "react";
import "./PainelChat.css"
import { Button, Modal } from "antd";
import { FaPlus } from "react-icons/fa6";
import FormChat from "../../components/FormChat/FormChat";
import SelectProject from "../../../../components/SelectProject/SelectProject";
import FormChatModal from "../../components/FormChat/FormChat";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import RenderEmpty from "../../../../components/Empty/Empty";
import { atualizarChat, buscarChatsDoUsuario, cadastrarChat, excluirChat } from "../../../../services/chatService";
import { useContextoChat } from "../../context/ContextoChat";
import ListChats from "../../components/ListChats/ListChats";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import SpinLoading from "../../../../components/SpinLoading/SpinLoading";
import PainelMensagens from "../../components/PainelMensagens/PainelMensagens";

const PainelChat = () => {

    const {usuario} = useContextoGlobalUser()
    const {dadosChat, setDadosChat, chatSelecionado, setChatSelecionado} = useContextoChat()
    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [actionForm, setActionForm] = useState('create')
    const [chats, setChats] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleBuscarChats = async () => {
        const response = await buscarChatsDoUsuario(usuario.id)
        if(!response.error){
            setChats(response.data)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (usuario.id){
                await handleBuscarChats()
            }
        }

        fetchData()
    }, [])

    const handleReload = async () => {
        await handleBuscarChats()
        setIsFormVisible(false)
        setChatSelecionado(null)
        setDadosProjeto(null)
        setDadosChat(null)
        setActionForm('create')
    }
    
    const handleAdicionarChat = () => {
        setIsFormVisible(true)
        setChatSelecionado(null)
        setDadosProjeto(null)
        setDadosChat(null)
        setActionForm('create')
    }

    const handleEditarChat = (record) => {
        setIsFormVisible(true)
        setActionForm('update')
        setDadosChat(record)
        setChatSelecionado(null)
    }

    const handleSalvarChat = async (data) => {

        if (actionForm === 'create'){
            await cadastrarChat(data)
        } else if (actionForm === 'update'){
            await atualizarChat(dadosChat.id, data)
        }
        await handleReload()
    }

    const handleExcluirChat = async (idChat) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir o chat ? Esta ação implicará na exclusão de todas as mensagens relacionados ao chat. ',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                await excluirChat(idChat)
                await handleReload()
            }
        });
    }

    const handleSelecionarChat = (chat) => {
        setChatSelecionado(chat)
    }

    const handleCloseModal = () => setIsFormVisible(false)


    return (
        <div className="painel-chat"> 
            {isLoading ? (
                <SpinLoading />
            ) : (
                <React.Fragment>
                    <div className="coluna-chat"> 
                        <Button type="primary" icon={<FaPlus />} onClick={handleAdicionarChat}> 
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
                        { chats.length === 0 && (
                            <RenderEmpty title="Você não possui nenhum chat criado." />
                        )}

                        {chats.length !== 0 && chatSelecionado === null ? (
                            <RenderEmpty title="Selecione um chat para exibir as mensagens" />
                        ) : (
                            <div style={{height: "100%"}}>
                                <PainelMensagens />
                            </div>
                        )}

                    </div>

                    <FormChatModal 
                        visible={isFormVisible}
                        action={actionForm}
                        onOk={handleSalvarChat}
                        onCancel={handleCloseModal}
                        selectProject={<SelectProject idMembro={usuario.id} />}
                    />
                </React.Fragment>
            )}
            

        </div>
    )
}

export default PainelChat