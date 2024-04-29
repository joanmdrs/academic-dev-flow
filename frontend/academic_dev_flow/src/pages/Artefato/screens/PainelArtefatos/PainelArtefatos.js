import React, { useState, useSyncExternalStore } from 'react'
import Aviso from '../../../../components/Aviso/Aviso'
import { Button, Spin } from 'antd'
import { FaPlus, FaTrash } from 'react-icons/fa'
import { useContextoGlobalProjeto } from '../../../../context/ContextoGlobalProjeto'
import { useContextoArtefato } from '../../context/ContextoArtefato'
import { BsQuestionCircle } from 'react-icons/bs'
import FormArtefato from '../../components/FormArtefato/FormArtefato'

const PainelArtefatos = () => {

    const {dadosProjeto} = useContextoGlobalProjeto()

    const {
        dadosArtefato, 
        setDadosArtefato, 
        artefatosSelecionados, 
        setArtefatosSelecionados} = useContextoArtefato()

    const [isFormSalvarVisivel, setIsFormSalvarVisivel] = useState(false)
    const [isBtnPlusDisabled, setIsBtnPlusDisabled] = useState(false)
    const isBtnTrashDisabled = artefatosSelecionados.length === 0
    const [isAvisoVisivel, setIsAvisoVisivel] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const handleAvisoClose = () => {
        setIsAvisoVisivel(false)
    }

    const handleDuvidaClick = () => {
        setIsAvisoVisivel(true)
    }

    const handleCancelar = () => {

    }

    const handleReload = () => {
        
    }

    const handleAdicionarArtefato = () => {
        setIsFormSalvarVisivel(true)
    }

    const handleAtualizarArtefato = () => {

    }

    const handleSalvarArtefato = () => {

    }
    
    const handleExcluirArtefatos = async () => {

    }

    return (
        <div>

            {isAvisoVisivel && (
                <Aviso
                    titulo="AVISO"
                    descricao="Ao cadastrar uma nova tarefa, uma issue correspondente será automaticamente criada no GitHub para acompanhamento e organização. Certifique-se de preencher todos os campos necessários com as informações relevantes antes de salvar a tarefa."
                    visible={isAvisoVisivel}
                    onClose={handleAvisoClose}
                />
            )}

            <div style={{display:'flex', justifyContent: 'flex-end', gap: '10px'}}> 
                <Button 
                    icon={<FaPlus />}
                    type="primary"
                    onClick={handleAdicionarArtefato}
                    disabled={isBtnPlusDisabled}
                >
                    Criar Tarefa
                </Button>

                <Button
                    icon={<FaTrash />}
                    type="primary"
                    danger
                    disabled={isBtnTrashDisabled}
                    onClick={handleExcluirArtefatos}
                >
                    Excluir
                </Button>

                <Button
                    icon={<BsQuestionCircle />}
                    onClick={handleDuvidaClick}
                
            
                />
            </div>


        { isFormSalvarVisivel ? (
            <div className="global-div">
                {isSaving && ( 
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Spin size="large" />
                    </div>
                )}
                <FormArtefato onSubmit={handleSalvarArtefato} onCancel={handleCancelar}  />
            </div>
        ) : (
           null
        )}
        </div>
        
    )
}

export default PainelArtefatos