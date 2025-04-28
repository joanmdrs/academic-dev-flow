import React, { useState } from "react";
import "./PainelChat.css"
import { Button } from "antd";
import { FaPlus } from "react-icons/fa6";
import FormChat from "../../components/FormChat/FormChat";
import SelectProject from "../../../../components/SelectProject/SelectProject";
import FormChatModal from "../../components/FormChat/FormChat";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import RenderEmpty from "../../../../components/Empty/Empty";
import { atualizarChat, cadastrarChat } from "../../../../services/chatService";
import { useContextoChat } from "../../context/ContextoChat";

const PainelChat = () => {

    const {usuario} = useContextoGlobalUser()
    const {dadosChat} = useContextoChat()
    const [isFormVisible, setIsFormVisible] = useState(false)

    const [actionForm, setActionForm] = useState('create')

    const handleAdicionarChat = () => {
        setIsFormVisible(true)
    }

    const handleSalvarChat = async (data) => {

        if (actionForm === 'create'){
            await cadastrarChat(data)
        } else if (actionForm === 'update'){
            await atualizarChat(dadosChat.id, data)
        }
    }

    const handleCloseModal = () => setIsFormVisible(false)


    return (
        <div className="painel-chat"> 
            <div className="coluna-chat"> 

                <Button type="primary" icon={<FaPlus />} onClick={handleAdicionarChat}> 
                    Criar Chat
                </Button>

                    
            </div>


            <div className="coluna-mensagens"> 
                <RenderEmpty title="Você ainda não possui nenhum Chat" />
            </div>

            <FormChatModal 
                visible={isFormVisible}
                action={actionForm}
                onOk={handleSalvarChat}
                onCancel={handleCloseModal}
                selectProject={<SelectProject idMembro={usuario.id} />}
            />

        </div>
    )
}

export default PainelChat