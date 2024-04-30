import React, { useState } from 'react'
import Aviso from '../../../../components/Aviso/Aviso'
import { Button, Spin } from 'antd'
import { FaPlus, FaSearch, FaTrash } from 'react-icons/fa'
import { useContextoGlobalProjeto } from '../../../../context/ContextoGlobalProjeto'
import { useContextoArtefato } from '../../context/ContextoArtefato'
import { BsQuestionCircle } from 'react-icons/bs'
import FormArtefato from '../../components/FormArtefato/FormArtefato'
import TableArtefatosSelect from '../../components/TableArtefatosSelect/TableArtefatosSelect'
import { createContent } from '../../../../services/githubIntegration'
import { atualizarArtefato, criarArtefato, filtrarArtefatosPeloNomeEPeloProjeto } from '../../../../services/artefatoService'
import FormGenericBusca from '../../../../components/Forms/FormGenericBusca/FormGenericBusca'
import FormFiltrarArtefatos from '../../components/FormFiltrarArtefatos/FormFiltrarArtefatos'

const PainelArtefatos = () => {

    const {dadosProjeto, autor} = useContextoGlobalProjeto()

    const {
        dadosArtefato, 
        setDadosArtefato, 
        setArtefatos,
        artefatosSelecionados, 
        setArtefatosSelecionados} = useContextoArtefato()

    const [isFormSalvarVisivel, setIsFormSalvarVisivel] = useState(false)
    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false)
    const [acaoForm, setAcaoForm] = useState('criar')
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
        setAcaoForm('criar')
        setArtefatosSelecionados([])
        setDadosArtefato(null)
        setIsAvisoVisivel(false)
        setIsBtnPlusDisabled(false)
        setIsFormSalvarVisivel(false)
        setIsFormBuscarVisivel(false)
        setIsSaving(false)
    }

    const handleReload = () => {
        setIsFormSalvarVisivel(false)
        setIsFormBuscarVisivel(false)
        setArtefatos([])
        setArtefatosSelecionados([])
    }

    const handleBuscarArtefato = () => {
        setIsFormBuscarVisivel(!isFormBuscarVisivel)
        setIsFormSalvarVisivel(false)
        setIsAvisoVisivel(false)
    }

    const handleFiltrarArtefatos = async (dados) => {
        const nomeArtefato = dados.nome
        const idProjeto = dadosProjeto.id
        const response = await filtrarArtefatosPeloNomeEPeloProjeto(nomeArtefato, idProjeto)
        if (!response.error) {
            setArtefatos(response.data)
        }
    }

    const handleCriarArquivo = async (dadosForm) => {
        const dadosEnviar = {
            github_token: dadosProjeto.token,
            repository: dadosProjeto.nome_repo,
            content: dadosForm.descricao,
            commit_message: dadosForm.commit_message,
            path_file: dadosForm.path_file,
            author_name: autor.nome_github,
            author_email: autor.email_github
        }
        console.log(dadosEnviar)
        const response = await createContent(dadosEnviar)
        return response
    }

    const handleAdicionarArtefato = () => {
        setIsFormSalvarVisivel(true)
        setDadosArtefato(null)
        setAcaoForm('criar')
    }

    const handleAtualizarArtefato = async (record) => {
        setIsFormSalvarVisivel(true)
        setAcaoForm('atualizar')
        setDadosArtefato(record)
    }

    const handleSalvarArtefato = async (dados) => {
        setIsSaving(true)
        dados['projeto'] = dadosProjeto.id

        if (acaoForm === 'criar') {
            const response = await handleCriarArquivo(dados)
            if (!response.error){
                dados['id_file'] = response.data.sha
                await criarArtefato(dados)
            } 
        } else if (acaoForm === 'atualizar'){
            await atualizarArtefato(dadosArtefato.id, dados)
        }

        handleReload()
        setIsSaving(false)
    }
    
    const handleExcluirArtefatos = async () => {

    }

    return (
        <div>

            {isAvisoVisivel && (
                <Aviso
                    titulo="AVISO"
                    descricao="Ao cadastrar um artefato, um arquivo correspondente será automaticamente criado no repositório GitHub vinculado a este projeto. Certifique-se de preencher todos os campos necessários com as informações relevantes antes de salvar o artefato."
                    visible={isAvisoVisivel}
                    onClose={handleAvisoClose}
                />
            )}

            <div style={{display:'flex', justifyContent:'space-between', gap: '10px', marginBottom: '40px'}}>

            <div>
                <Button
                    icon={<FaSearch />}
                    type='primary'
                    onClick={handleBuscarArtefato}
                >
                    Buscar
                </Button>
            </div> 

            <div className='grouped-buttons'>
                <Button 
                    icon={<FaPlus />}
                    type="primary"
                    onClick={handleAdicionarArtefato}
                    disabled={isBtnPlusDisabled}
                >
                    Criar Artefato
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
        </div>

        {isFormBuscarVisivel && (
                <div className='global-div' style={{width: '50%', margin: '0', marginBottom: '20px'}}>   
                    <FormFiltrarArtefatos onSearch={handleFiltrarArtefatos} onClear={handleCancelar} />
                </div>
            )}


        { isFormSalvarVisivel ? (
            <div className="global-div">
                {isSaving && ( 
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Spin size="large" />
                    </div>
                )}
                <FormArtefato onSubmit={handleSalvarArtefato} onCancel={handleReload}  />
            </div>
        ) : (
           <TableArtefatosSelect onEdit={handleAtualizarArtefato} />
        )}
        </div>
        
    )
}

export default PainelArtefatos