import React, { useState } from "react";
import {Button, Modal} from 'antd'
import Titulo from "../../../../components/Titulo/Titulo";
import { FaPlus, FaSearch } from "react-icons/fa";
import FormGenericBusca from "../../../../components/Forms/FormGenericBusca/FormGenericBusca";
import FormArtefato from "../../components/FormArtefato/FormArtefato";
import ListaArtefatos from "../../components/ListaArtefatos/ListaArtefatos";
import SelectProjeto from "../../components/SelectProjeto/SelectProjeto"
import InputsAdmin from "../../components/InputsAdmin/InputsAdmin"
import { useContextoArtefato } from "../../context/ContextoArtefato";
import { createContent, getContent } from "../../../../services/githubIntegration";
import { atualizarArtefato, criarArtefato, excluirArtefato, filtrarArtefatosPeloNomeEPeloProjeto } from "../../../../services/artefatoService";
import { buscarProjetoPeloId } from "../../../../services/projetoService";

const GerenciarArtefatos = () => {

    const [isFormVisivel, setIsFormVisivel] = useState(false)
    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false)
    const [acaoForm, setAcaoForm] = useState('criar')
    const {dadosArtefato, setDadosArtefato, dadosProjeto, setDadosProjeto, setArtefatos} = useContextoArtefato()

    const handleCancelar = () => {
        setIsFormVisivel(false)
    }

    const handleReload = () => {
        setIsFormVisivel(false)
        setIsFormBuscarVisivel(false)
        setDadosProjeto(null)
        setArtefatos([])
    }

    const handleBuscarArquivoNoGithub = async (record) => {

        const response = await buscarProjetoPeloId(record.projeto)

        const projeto = response.data

        const parametros = {
            github_token: projeto.token,
            repository: "joanmdrs/sistema-gerenciamento-tarefas",
            path: "docs/documento-teste.md"
        }
        const response1 = await getContent(parametros)
        console.log(response1)
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
            setArtefatos(response.data)
        }
    }

    const handleExcluirArtefato = async (id) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir este(s) item(s) ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                await excluirArtefato(id)
                handleReload()
            }
        });
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
                        onGetContent={handleBuscarArquivoNoGithub} 
                        onEdit={handleAtualizarArtefato} 
                        onDelete={handleExcluirArtefato} />
                )}
            </div>
        </React.Fragment>    
    )
}

export default GerenciarArtefatos