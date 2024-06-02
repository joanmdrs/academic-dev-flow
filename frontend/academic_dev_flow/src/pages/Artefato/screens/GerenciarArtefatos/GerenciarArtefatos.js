import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Spin} from 'antd'
import Titulo from "../../../../components/Titulo/Titulo";
import { FaPlus, FaSearch } from "react-icons/fa";
import FormGenericBusca from "../../../../components/Forms/FormGenericBusca/FormGenericBusca";
import FormArtefato from "../../components/FormArtefato/FormArtefato";
import ListaArtefatos from "../../components/ListaArtefatos/ListaArtefatos";
import SelectProjeto from "../../components/SelectProjeto/SelectProjeto"
import InputsAdmin from "../../components/InputsAdmin/InputsAdmin"
import { useContextoArtefato } from "../../context/ContextoArtefato";
import { createContent, deleteContent } from "../../../../services/githubIntegration";
import { atualizarArtefato, criarArtefato, excluirArtefato, filtrarArtefatosPeloNomeEPeloProjeto } from "../../../../services/artefatoService";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import ModalExcluirArtefato from "../../components/ModalExcluirArtefato/ModalExcluirArtefato";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { buscarUsuarioPeloIdMembroProjeto } from "../../../../services/membroService";
import { handleInfo } from "../../../../services/utils";

const StyleSpin = {
    position: 'fixed', 
    top: 0, 
    left: 0, 
    width: '100%', 
    height: '100%', 
    backgroundColor: 'rgba(255, 255, 255, 0.5)', 
    zIndex: 9999, 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center'
};

const GerenciarArtefatos = () => {

    const [isFormVisivel, setIsFormVisivel] = useState(false)
    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false)
    const [isModalExcluirVisivel, setIsModalExcluirVisivel] = useState(false)
    const [acaoForm, setAcaoForm] = useState('criar')
    const [artefatoExcluir, setArtefatoExcluir] = useState(null)
    const {dadosArtefato, setDadosArtefato, setArtefatos} = useContextoArtefato()
    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()
    const [isSaving, setIsSaving] = useState(false)

    const navigate = useNavigate()

    const handleExibirModal = () => setIsModalExcluirVisivel(true)
    
    const handleFecharModal = () => setIsModalExcluirVisivel(false)


    const handleCancelar = () => {  
        setIsFormVisivel(false)
        setIsSaving(false)
        setDadosArtefato(null)
        setDadosProjeto(null)
    }

    const handleReload = () => {
        setIsFormVisivel(false)
        setIsFormBuscarVisivel(false)
        setDadosProjeto(null)
        setArtefatos([])
    }

    const handleVisualizarArtefato = async (record) => {

        const response = await buscarProjetoPeloId(record.projeto)
        const projeto = response.data

        const parametros = {
            github_token: projeto.token,
            repository: projeto.nome_repo,
            id_projeto: projeto.id,
            id_artefato: record.id,
            path: record.path_file
        }
        navigate("/admin/artefatos/visualizar", {
            state: parametros
        });
    }

    const handleBuscarProjeto = async (id) => {
        const response = await buscarProjetoPeloId(id)
        setDadosProjeto(response.data)
    }

    const handleCriarArtefato = () => {
        setIsFormVisivel(true)
        setDadosProjeto(null)
        setAcaoForm('criar')
    }

    const handleAtualizarArtefato = async (record) => {
        await handleBuscarProjeto(record.projeto)
        setIsFormVisivel(true)
        setIsFormBuscarVisivel(false)
        setAcaoForm('atualizar')
        setDadosArtefato(record)
    }

    const handleBuscarAutor = async (idMembroProjeto) => {

        const response = await buscarUsuarioPeloIdMembroProjeto(idMembroProjeto)
        return response
    }

    const handleSalvarArtefato = async (dados) => {
        setIsSaving(true)
        if  (dados.membro !== undefined){
            const resAutor = await handleBuscarAutor(dados.membro)
            dados['author_name'] = resAutor.data.nome
            dados['author_email'] = resAutor.data.email_github
        }
        

        dados['projeto'] = dadosProjeto.id
        dados['github_token'] = dadosProjeto.token
        dados['repository'] = dadosProjeto.nome_repo
        dados['content'] = dados.descricao

        if (acaoForm === 'criar') {
            const response = await createContent(dados)
            if (!response.error){
                dados['id_file'] = response.data.sha
                await criarArtefato(dados)
                handleReload()
            } 
        } else if (acaoForm === 'atualizar'){
            console.log(dados)
            await atualizarArtefato(dadosArtefato.id, dados)
            handleReload()
        }
        setIsSaving(false)
    }

    const handleBuscarArtefato = async (dados) => {
        const nomeArtefato = dados.nome
        const idProjeto = dados.id_projeto
        const response = await filtrarArtefatosPeloNomeEPeloProjeto(nomeArtefato, idProjeto)
        if (!response.error && response.data.length > 0) {

            const dadosModificar = await Promise.all(response.data.map(async (artefato) => {
                const resProjeto = await buscarProjetoPeloId(artefato.projeto);

                if (!resProjeto.error){
                    artefato['nome_projeto'] = resProjeto.data.nome;
                }
                return artefato;
            }));
            const resultado = await (Promise.resolve(dadosModificar))
            setArtefatos(resultado)
        }
    }

    const handlePrepararParaExcluirArtefato = async (record) => {
        handleExibirModal()
        const resProjeto = await buscarProjetoPeloId(record.projeto)
        const projeto = resProjeto.data
        const parametros = {
            id_artefato: record.id,
            github_token: projeto.token,
            repository: projeto.nome_repo,
            path: record.path_file
        }
        setArtefatoExcluir(parametros)
    }

    const handleExcluirArtefato = async (parametro) => {
        handleFecharModal()
        setIsSaving(true)
        const objeto = artefatoExcluir
        objeto['commit_message'] = parametro

        const response = await deleteContent(objeto)
        if(!response.error){
            await excluirArtefato(objeto.id_artefato)
        }
        handleReload()
        setIsSaving(false)
    }

    const handleAtualizarStatusArtefato = async (record, value) => {

        const dados = {
            status: value
        }
        await atualizarArtefato(record.id, dados)
        handleReload()
    }

    return (
        <React.Fragment>
            <Titulo 
                titulo='Artefatos'
                paragrafo='Artefatos > Gerenciar artefatos'
            />

            <div className="button-menu"> 
                <Button
                    icon={<FaSearch />} 
                    type="primary"
                    onClick={() => setIsFormBuscarVisivel(!isFormBuscarVisivel)}
                >
                    Buscar
                </Button>

                <Button 
                    icon={<FaPlus />} 
                    type="primary" 
                    onClick={handleCriarArtefato}
                >
                    Criar Artefato
                </Button>
                
            </div>

            {isFormBuscarVisivel && (
                <div className="global-div" style={{width: '50%'}}>   
                    <FormGenericBusca onSearch={handleBuscarArtefato} />
                </div>
            )}

            <div className="global-div"> 

                {isFormVisivel && acaoForm === 'criar' && (
                    <React.Fragment> 
                        {isSaving && ( 
                            <div style={StyleSpin}>
                                <Spin size="large" />
                            </div>
                        )}
                        <FormArtefato 
                            onSubmit={handleSalvarArtefato} 
                            onCancel={handleCancelar}
                            selectProjeto={<SelectProjeto />} 
                            inputsAdmin={<InputsAdmin/>} 
                        /> 
                    </React.Fragment>
                )}

                {isFormVisivel && acaoForm === 'atualizar' && (
                    <React.Fragment> 
                        {isSaving && ( 
                            <div style={StyleSpin}>
                                <Spin size="large" />
                            </div>
                        )}
                        <FormArtefato 
                            onSubmit={handleSalvarArtefato} 
                            onCancel={handleCancelar} 
                        />
                    </React.Fragment>
                )}
                

                {!isFormVisivel && (
                    <React.Fragment>
                        {isSaving && ( 
                            <div style={StyleSpin}>
                                <Spin size="large" />
                            </div>
                        )}
                        <ListaArtefatos    
                            onView={handleVisualizarArtefato} 
                            onEdit={handleAtualizarArtefato} 
                            onDelete={handlePrepararParaExcluirArtefato}
                            onUpdateStatus={handleAtualizarStatusArtefato}
                        />
                    </React.Fragment>
                )}
                
            </div>

            <ModalExcluirArtefato 
                visible={isModalExcluirVisivel}
                onCancel={handleFecharModal}
                onDelete={handleExcluirArtefato}
            />
        </React.Fragment>    
    )
}

export default GerenciarArtefatos