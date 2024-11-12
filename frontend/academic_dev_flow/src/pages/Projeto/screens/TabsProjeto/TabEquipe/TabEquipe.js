import { Button, Modal } from "antd";
import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import TableEquipe from "../../../components/TableEquipe/TableEquipe";
import FormVincularMembro from "../../../components/FormVincularMembro/FormVincularMembro";
import { buscarMembrosPorProjeto, criarMembroProjeto, excluirMembroProjeto } from "../../../../../services/membroProjetoService";
import { NotificationManager } from "react-notifications";
import { useContextoProjeto } from "../../../context/ContextoProjeto";

const TabEquipe = () => {

    const [isFormVisible, setIsFormVisible] = useState(false)
    const [isTableVisible, setIsTableVisible] = useState(true)
    const {
        dadosProjeto, 
        setMembros, 
        membrosSelecionados, 
        setMembrosSelecionados} = useContextoProjeto()

    const handleCancelar = () => {
        setIsTableVisible(true)
        setIsFormVisible(false)
    }

    const handleReload = async () => {
        setIsFormVisible(false)
        setIsTableVisible(true)
        setMembrosSelecionados([])
        await handleListarMembros()
    }

    const handleAdicionarMembro = () => {
        setIsFormVisible(true)
        setIsTableVisible(false)
    }

    const handleVincularMembros = async (formData) => {
        await criarMembroProjeto(formData)
        handleReload()
    }

    const handleListarMembros = async () => {
        const response = await buscarMembrosPorProjeto(dadosProjeto.id)
        if (!response.error){
            setMembros(response.data)
        }
    }

    const handleRemoverMembros = async () => {
        Modal.confirm({
            title: 'Confirmar remoção',
            content: 'Você está seguro de que deseja remover estes membros do projeto ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                try {

                    const ids = membrosSelecionados.map((item) => item.id)
                    await excluirMembroProjeto(ids)
                    await handleReload()

                } catch (error) {
                    NotificationManager.error('Falha ao tentar remover os membros');
                } 
            }
        });
    }

    return (    
        <React.Fragment>
            {dadosProjeto && (
                <React.Fragment>
                    <div style={{display: 'flex', justifyContent: 'space-between', margin: '20px'}}> 
                        <div style={{display: 'flex', gap: '20px'}}>
                        </div>

                        <div style={{display: 'flex', gap: '10px'}}> 
                            <Button 
                                icon={<FaPlus />} 
                                type="primary" 
                                onClick={handleAdicionarMembro}
                            >
                                Vincular Membro
                            </Button>
                            <Button 
                                icon={<FaTrash />} 
                                danger
                                disabled={membrosSelecionados.length === 0 ? true : false}
                                onClick={() =>  handleRemoverMembros()}
                            >
                                Remover
                            </Button>
                        </div>
                    </div>


                    <div>
                        {isFormVisible && <FormVincularMembro onSubmit={handleVincularMembros} onCancel={handleCancelar} />}
                        {isTableVisible && <TableEquipe />}
                    </div>

                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default TabEquipe