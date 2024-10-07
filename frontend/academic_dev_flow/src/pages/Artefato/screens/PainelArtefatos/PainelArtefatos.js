import React, { useState } from 'react'
import Aviso from '../../../../components/Aviso/Aviso'
import { Button, Form, Input, Spin } from 'antd'
import { FaLink, FaPlus, FaSearch } from 'react-icons/fa'
import { useContextoArtefato } from '../../context/ContextoArtefato'
import { BsQuestionCircle } from 'react-icons/bs'
import FormArtefato from '../../components/FormArtefato/FormArtefato'
import { createContent, deleteContent } from '../../../../services/githubIntegration'
import { atualizarArtefato, atualizarIteracaoDosArtefatos, buscarArtefatosPeloNomeEPeloProjeto, criarArtefato, excluirArtefato } from '../../../../services/artefatoService'
import FormFiltrarArtefatos from '../../components/FormFiltrarArtefatos/FormFiltrarArtefatos'
import ModalExcluirArtefato from '../../components/ModalExcluirArtefato/ModalExcluirArtefato'
import { useNavigate } from "react-router-dom";
import TableArtefatosProjeto from '../../components/TableArtefatosProjeto/TableArtefatosProjeto'
import ModalVincularIteracao from '../../components/ModalVincularIteracao/ModalVincularIteracao'
import { useContextoGlobalProjeto } from '../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto'

const StyleSpin = {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    zIndex: 9999, 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center'
}

const PainelArtefatos = () => {

    const {dadosProjeto, autor, grupo} = useContextoGlobalProjeto()

    const {
        dadosArtefato, 
        setDadosArtefato, 
        setArtefatos,
        artefatosSelecionados,
        setArtefatosSelecionados,
        handleListarArtefatos
    } = useContextoArtefato()

    const [isFormSalvarVisivel, setIsFormSalvarVisivel] = useState(false)
    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false)
    const [isTableListVisivel, setIsTableListVisivel] = useState(true)
    const [isModalExcluirVisivel, setIsModalExcluirVisivel] = useState(false)
    const [acaoForm, setAcaoForm] = useState('criar')
    const [isBtnPlusDisabled, setIsBtnPlusDisabled] = useState(false)
    const [isAvisoVisivel, setIsAvisoVisivel] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isModalVincularIteracaoVisivel, setIsModalVincularIteracaoVisivel] = useState(false)

    const navigate = useNavigate();

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
        setIsTableListVisivel(true)
        setIsAvisoVisivel(false)
        setIsBtnPlusDisabled(false)
        setIsFormSalvarVisivel(false)
        setIsFormBuscarVisivel(false)
        setIsModalVincularIteracaoVisivel(false)
        setIsSaving(false)
    }

    const handleReload = async () => {
        setIsTableListVisivel(true)
        setIsFormSalvarVisivel(false)
        setIsFormBuscarVisivel(false)
        setIsModalVincularIteracaoVisivel(false)
        setArtefatos([])
        setArtefatosSelecionados([])
        await handleListarArtefatos(dadosProjeto.id)
    }

    const handleBuscarArtefato = () => {
        setIsFormBuscarVisivel(!isFormBuscarVisivel)
        setIsFormSalvarVisivel(false)
        setIsAvisoVisivel(false)
    }

    const handleFiltrarArtefatos = async (dados) => {
        const nomeArtefato = dados.nome
        const idProjeto = dadosProjeto.id
        const response = await buscarArtefatosPeloNomeEPeloProjeto(nomeArtefato, idProjeto)
        if (!response.error) {
            setArtefatos(response.data)
        }
    }

    const handleVisualizarArtefato = async (record) => {

        setDadosArtefato(record)

        const parametros = {
            github_token: dadosProjeto.token,
            repository: dadosProjeto.nome_repo,
            id_projeto: dadosProjeto.id,
            id_artefato: record.id,
            path: record.path_file
        }
        if (grupo === 'Docentes') {
            navigate("/professor/artefatos/visualizar", {
                state: parametros
            });
        } else if (grupo === 'Discentes') {
            navigate("/aluno/artefatos/visualizar", {
                state: parametros
            });
        } else if (grupo === 'Administradores') {
            navigate("/admin/artefatos/visualizar", {
                state: parametros
            });
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
        const response = await createContent(dadosEnviar)
        return response
    }

    const handleAdicionarArtefato = () => {
        setIsFormSalvarVisivel(true)
        setIsFormBuscarVisivel(false)
        setIsTableListVisivel(false)
        setDadosArtefato(null)
        setAcaoForm('criar')
    }

    const handleAtualizarArtefato = async (record) => {
        setIsFormSalvarVisivel(true)
        setIsTableListVisivel(false)
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

    const handleExibirModal = () => setIsModalExcluirVisivel(true)
    
    const handleFecharModal = () => setIsModalExcluirVisivel(false)
    
    const handleExcluirArtefato = async (record) => {
        handleExibirModal()
        setDadosArtefato(record)
    }

    const handleConfirmarExclusao = async (commitMessage) => {
        handleFecharModal()
        setIsSaving(true)
        const parametros = {
            github_token: dadosProjeto.token,
            repository: dadosProjeto.nome_repo,
            path: dadosArtefato.path_file,
            commit_message: commitMessage
        }
        const response = await deleteContent(parametros)
        
        if (!response.error) {
            await excluirArtefato(dadosArtefato.id)
        }

        handleReload()
        setIsSaving(false)
    }

    const handleAtualizarIteracaoDosArtefatos = async (idIteracao) => {
        if (artefatosSelecionados !== null) {
            const ids = artefatosSelecionados.map((item) => item.id)
            const dados = {
                ids_artefatos: ids,
                id_iteracao: idIteracao
            }
            await atualizarIteracaoDosArtefatos(dados)
            handleReload()
        }
    }

    const handleAtualizarStatusArtefato = async (record, value) => {

        const dados = {
            status: value
        }
        await atualizarArtefato(record.id, dados)
        handleReload()
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
                <div style={{display: 'flex', gap: '10px'}}>
                    <Button
                        icon={<FaSearch />}
                        type='primary'
                        onClick={handleBuscarArtefato}
                    >
                        Buscar
                    </Button>

                    <Button 
                        type="primary"
                        icon={<FaLink />}
                        ghost
                        onClick={() => setIsModalVincularIteracaoVisivel(true)}
                        disabled={artefatosSelecionados.length > 0 ? false : true}
                    > 
                        Vincular Iteração
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


            {isFormSalvarVisivel && acaoForm === 'criar' && (
                <div className="global-div">
                    {isSaving && ( 
                        <div style={StyleSpin}>
                            <Spin size="large" />
                        </div>
                    )}
                    <FormArtefato 
                        onSubmit={handleSalvarArtefato} 
                        onCancel={handleReload} 
                        inputCommitMessage={
                            <Form.Item 
                                label="Mensagem de commit" 
                                name="commit_message" 
                                rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}>
                                <Input name="commit_message" placeholder="mensagem de commit"/>
                            </Form.Item>
                        } 
                    />
                </div>
            )}

            {isFormSalvarVisivel && acaoForm === 'atualizar' && (
                <div className="global-div">
                    {isSaving && ( 
                        <div style={StyleSpin}>
                            <Spin size="large" />
                        </div>
                    )}
                    <FormArtefato 
                        onSubmit={handleSalvarArtefato} 
                        onCancel={handleReload} 
                    />
                </div>
            )}

            { isTableListVisivel && 
                <div>
                    {isSaving && ( 
                        <div style={StyleSpin}>
                            <Spin size="large" />
                        </div>
                    )}
                    <TableArtefatosProjeto 
                        onView={handleVisualizarArtefato}
                        onEdit={handleAtualizarArtefato} 
                        onDelete={handleExcluirArtefato}
                        onUpdateStatus={handleAtualizarStatusArtefato}
                    />
                </div>
            }

            <ModalExcluirArtefato 
                visible={isModalExcluirVisivel}
                onCancel={handleFecharModal}
                onDelete={handleConfirmarExclusao}
            />

            <ModalVincularIteracao
                visible={isModalVincularIteracaoVisivel}
                onCancel={handleCancelar}
                onUpdate={handleAtualizarIteracaoDosArtefatos}
            />

            
        </div>
        
    )
}

export default PainelArtefatos