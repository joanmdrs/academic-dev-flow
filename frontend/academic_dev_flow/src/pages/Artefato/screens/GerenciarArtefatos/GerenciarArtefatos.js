import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Button} from 'antd'
import Titulo from "../../../../components/Titulo/Titulo";
import { FaGithub, FaPlus, FaSearch } from "react-icons/fa";
import FormGenericBusca from "../../../../components/Forms/FormGenericBusca/FormGenericBusca";
import FormArtefato from "../../components/FormArtefato/FormArtefato";
import ListaArtefatos from "../../components/ListaArtefatos/ListaArtefatos";
import SelectProjeto from "../../components/SelectProjeto/SelectProjeto"
import InputsAdmin from "../../components/InputsAdmin/InputsAdmin"
import { useContextoArtefato } from "../../context/ContextoArtefato";
import { createContent, deleteContent, listContents } from "../../../../services/githubIntegration";
import { atualizarArtefato, criarArtefato, filtrarArtefatosPeloNomeEPeloProjeto } from "../../../../services/artefatoService";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import ModalExcluirArtefato from "../../components/ModalExcluirArtefato/ModalExcluirArtefato";
import FormListarArquivos from "../../components/FormListarArquivos/FormListarArquivos";

const GerenciarArtefatos = () => {

    const [isFormVisivel, setIsFormVisivel] = useState(false)
    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false)
    const [isFormListarVisibel, setIsFormListarVisivel] = useState(false)
    const [isModalExcluirVisivel, setIsModalExcluirVisivel] = useState(false)
    const [acaoForm, setAcaoForm] = useState('criar')
    const [artefatoExcluir, setArtefatoExcluir] = useState(null)
    const {dadosArtefato, setDadosArtefato, dadosProjeto, setDadosProjeto, setArtefatos} = useContextoArtefato()
    const navigate = useNavigate()

    const handleExibirModal = () => setIsModalExcluirVisivel(true)
    
    const handleFecharModal = () => setIsModalExcluirVisivel(false)


    const handleCancelar = () => {  
        setIsFormVisivel(false)
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
            path: record.path_file
        }
        navigate("/admin/artefatos/visualizar-artefato", {
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

    const handleSalvarArtefato = async (dados) => {
        dados['projeto'] = dadosProjeto.id
        dados['github_token'] = dadosProjeto.token
        if (acaoForm === 'criar') {
            const response = await createContent(dados)
            if (!response.error){
                dados['id_file'] = response.data.sha
                await criarArtefato(dados)
                handleReload()
            } 
        } else if (acaoForm === 'atualizar'){
            await atualizarArtefato(dadosArtefato.id, dados)
            handleReload()
        }
    }

    const handleBuscarArtefato = async (dados) => {
        const nomeArtefato = dados.nome
        const idProjeto = dados.id_projeto
        const response = await filtrarArtefatosPeloNomeEPeloProjeto(nomeArtefato, idProjeto)
        if (!response.error) {

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
            github_token: projeto.token,
            repository: projeto.nome_repo,
            path: record.path_file
        }
        setArtefatoExcluir(parametros)
        console.log(parametros)  
    }

    const handleExcluirArtefato = async (parametro) => {
        const objeto = artefatoExcluir
        objeto['commit_message'] = parametro
        console.log(objeto)
        await deleteContent(objeto)
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
                        <FormArtefato 
                            onSubmit={handleSalvarArtefato} 
                            onCancel={handleCancelar}
                            selectProjeto={<SelectProjeto />} 
                            inputsAdmin={<InputsAdmin/>} /> 
                    </React.Fragment>
                )}

                {isFormVisivel && acaoForm === 'atualizar' && (
                    <FormArtefato onSubmit={handleSalvarArtefato} onCancel={handleCancelar} />
                )}

                {!isFormVisivel  && (
                    <ListaArtefatos    
                        onView={handleVisualizarArtefato} 
                        onEdit={handleAtualizarArtefato} 
                        onDelete={handlePrepararParaExcluirArtefato} />
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