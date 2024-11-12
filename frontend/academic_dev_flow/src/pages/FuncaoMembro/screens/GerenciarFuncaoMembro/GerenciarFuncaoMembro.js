import React, { useState } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import { Button } from "antd";
import { FaFilter, FaPlus } from "react-icons/fa";
import { useFuncaoMembroContexto } from "../../context/FuncaoMembroContexto";
import FormFuncaoMembro from "../../components/FormFuncaoMembro/FormFuncaoMembro";
import TableFuncaoMembro from "../../components/TableFuncaoMembro/TableFuncaoMembro";
import { atualizarFuncaoMembroProjeto, cadastrarFuncaoMembroProjeto, filtrarFuncaoMembroProjeto, listarFuncaoMembro } from "../../../../services/funcaoMembroProjetoService";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import FormFilterFuncaoMembro from "../../components/FormFilterFuncaoMembro/FormFilterFuncaoMembro";

const GerenciarFuncaoMembro = () => {

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isTableVisible, setIsTableVisible] = useState(true)
    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false);
    const [isPlusBtnEnabled, setIsPlusBtnEnabled] = useState(false);
    const {setDadosFuncaoMembro, setItemsFuncaoMembro} = useFuncaoMembroContexto()

    const handleCancelar = () => {
        setIsFormVisible(false)
        setIsTableVisible(true)
    }

    const handleReload = async () => {
        setIsFormVisible(false)
        setIsFormBuscarVisivel(false)
        setIsTableVisible(true)
        setDadosFuncaoMembro(null)
        await handleListarFuncaoMembro()
    }

    const handleAdicionarFuncaoMembro = async () => {   
        setIsFormVisible(true)
        setIsFormBuscarVisivel(false)
        setIsTableVisible(false)
    }

    const handleListarFuncaoMembro = async () => {
        try {
            const response = await listarFuncaoMembro()

            if (!response.error){
                setItemsFuncaoMembro(response.data)
            }
        } catch (error) {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
        }
    }

    const handleAtribuirFuncaoMembro = async (formData) => {
        try {
            await cadastrarFuncaoMembroProjeto(formData)
            handleReload()
        } catch (error) {
            return handleError(error, 'Falha ao atribuir a função !')
        }
    }

    const handleAtualizarStatusFuncaoMembro = async (id, status) => {
        try {
            const formData = {
                status: status
            }
            await atualizarFuncaoMembroProjeto(id, formData)
            handleReload()
        } catch (error) {
            return handleError(error, 'Falha ao atualizar o status da função do membro!')
        }
    }

    const handleFiltrarFuncaoMembro = async (params) => {
        console.log(params)
        const response = await filtrarFuncaoMembroProjeto(params)

        if (!response.error){
            setItemsFuncaoMembro(response.data)
        }
    }

    return (
        <div className="content">
            <Titulo 
                titulo='Gerenciar funções'
                paragrafo='Membro > Função > Gerenciar funções'
            />

            { !isFormVisible && (
                <div className="button-menu">
                    <Button 
                        icon={<FaFilter />}
                        type="primary"
                        onClick={() => setIsFormBuscarVisivel(!isFormBuscarVisivel)}
                    >
                        Filtrar
                    </Button>

                    <Button 
                        icon={<FaPlus />} 
                        type="primary" 
                        disabled={isPlusBtnEnabled}
                        onClick={handleAdicionarFuncaoMembro}
                    > 
                        Atribuir Função
                    </Button>
                </div>
            )}

            { isFormBuscarVisivel && (
                <div style={{width: '50%'}}>
                    <FormFilterFuncaoMembro onSubmit={handleFiltrarFuncaoMembro} />
                </div>
            )}

            <div>
                { isFormVisible && <FormFuncaoMembro onSubmit={handleAtribuirFuncaoMembro} onCancel={handleCancelar} /> }
                { isTableVisible && <TableFuncaoMembro onDisable={handleAtualizarStatusFuncaoMembro} /> }
           </div>

        </div>
    );
}

export default GerenciarFuncaoMembro