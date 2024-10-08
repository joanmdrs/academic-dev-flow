import { Button } from "antd";
import React, { useState } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import { FaFilter, FaPlus, FaTrash } from "react-icons/fa";
import TableMembroProjeto from "../../components/TableMembroProjeto/TableMembroProjeto";
import { useMembroContexto } from "../../context/MembroContexto";
import FormMembroProjeto from "../../components/FormMembroProjeto/FormMembroProjeto";
import { handleError } from "../../../../services/utils";
import { criarMembroProjeto } from "../../../../services/membroProjetoService";

const VincularMembroAoProjeto = () => {
    const [titleForm, setTitleForm] = useState('VINCULAR PROJETO AO MEMBRO')
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [isFormFilterVisible, setIsFormFilterVisible] = useState(false)
    const [isTableVisible, setIsTableVisible] = useState(true)
    const {setDadosMembroProjeto, objsMembroProjetoSelecionados} = useMembroContexto()
    const [isSearchBtnEnabled, setIsSearchBtnEnabled] = useState(true)

    const handleCancelar = () => {
        setIsFormVisible(false)
        setIsTableVisible(true)
    }

    const handleReload = () => {
        setIsFormVisible(false)
        setIsFormFilterVisible(false)
        setIsTableVisible(true)
        setDadosMembroProjeto(null)
    }

    const handleAdicionarMembroProjeto = () => {
        setIsFormVisible(true)
        setIsTableVisible(false)
        setIsFormFilterVisible(false)
        setDadosMembroProjeto(null)
    }

    const handleVincularMembroAoProjeto = async (formData) => {
        try {
            const response = await criarMembroProjeto([formData])

            if (!response.error){
                handleReload()
            }
        } catch (error) {
            return handleError(error, 'Falha ao tentar vincular o membro ao projeto!')
        }
    }

    return (
        <div>
            
            <Titulo 
                titulo='Vincular Projeto'
                paragrafo='Membros > Vincular Projeto'
            />

            <div style={{display: 'flex', justifyContent: 'space-between', margin: '20px'}}> 
                <div>
                    <Button
                        icon={<FaFilter />} 
                        type="primary"
                        disabled={isSearchBtnEnabled}
                        onClick={() => setIsFormFilterVisible(!isFormFilterVisible)}
                    >
                        Filtrar
                    </Button>
                </div>

                <div style={{display: 'flex', gap: '10px'}}> 
                    <Button 
                        icon={<FaPlus />} 
                        type="primary" 
                        onClick={handleAdicionarMembroProjeto}
                    >
                        Vincular Projeto
                    </Button>
                    <Button 
                        icon={<FaTrash />} 
                        type="primary" 
                        danger
                        disabled={objsMembroProjetoSelecionados.length === 0 ? true : false}
                    >
                        Excluir
                    </Button>
                </div>
            </div>

            <div className="global-div"> 
                {isFormVisible && 
                    <FormMembroProjeto 
                        titleForm={titleForm}
                        onSubmit={handleVincularMembroAoProjeto} 
                        onCancel={handleCancelar} 
                    />
                }

                {isTableVisible && <TableMembroProjeto />}
            </div>
            
        </div>
    );
}

export default VincularMembroAoProjeto