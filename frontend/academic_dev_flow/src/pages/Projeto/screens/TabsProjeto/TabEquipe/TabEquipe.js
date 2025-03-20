import { Button, Modal, Space } from "antd";
import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import TableEquipe from "../../../components/TableEquipe/TableEquipe";
import FormVincularMembro from "../../../components/FormVincularMembro/FormVincularMembro";
import { buscarMembrosPorProjeto, criarMembroProjeto, excluirMembroProjeto } from "../../../../../services/membroProjetoService";
import { NotificationManager } from "react-notifications";
import { useContextoProjeto } from "../../../context/ContextoProjeto";

const TabEquipe = ({onCancel}) => {

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

    const handleRemoverMembros = async (idsMembros) => {
        Modal.confirm({
            title: 'Confirmar remoção',
            content: 'Você está seguro de que deseja remover estes membros do projeto ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                try {

                    await excluirMembroProjeto(idsMembros)
                    await handleReload()

                } catch (error) {
                    NotificationManager.error('Falha ao tentar remover os membros');
                } 
            }
        });
    }

    const handleRemoverOneMembro = async (idMembroProjeto) => {
        await handleRemoverMembros([idMembroProjeto])
    }

    const handleRemoverManyMembros = async () => {
        const ids = membrosSelecionados.map((item) => item.id)
        await handleRemoverMembros(ids)
    }

    return (    
        <React.Fragment>
            {dadosProjeto ? (
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
                                onClick={() =>  handleRemoverManyMembros()}
                            >
                                Remover
                            </Button>
                        </div>
                    </div>


                    <div>
                        {isFormVisible && <FormVincularMembro onSubmit={handleVincularMembros} onCancel={handleCancelar} />}
                        {isTableVisible && <TableEquipe onDelete={handleRemoverOneMembro} />}
                    </div>

                </React.Fragment>
            ) : (
                <div> 
                    É necessário cadastrar os dados do projeto primeiro.
                </div>
            )}
        </React.Fragment>
    )
}

export default TabEquipe