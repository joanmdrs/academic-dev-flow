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
import { buscarUsuarioPeloIdMembroProjeto } from "../../../../services/membroService";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { NotificationManager } from "react-notifications";
import { updateIssue } from "../../../../services/githubIntegration/issueService";

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

const AdminArtefatos = () => {

    const [isFormVisible, setIsFormVisible] = useState(false)
    const [isFormFilterArtefatoVisible, setIsFormFilterArtefatoVisible] = useState(false)
    const [isModalToDeleteVisible, setIsModalToDeleteVisible] = useState(false)
    const [actionForm, setActionForm] = useState('create')
    const [artefatoToDelete, setArtefatoToDelete] = useState(null)
    const {dadosArtefato, setDadosArtefato, setArtefatos} = useContextoArtefato()
    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleExibirModal = () => setIsModalToDeleteVisible(true)
    
    const handleFecharModal = () => setIsModalToDeleteVisible(false)


    const handleCancelar = () => {  
        setIsFormVisible(false)
        setIsLoading(false)
        setDadosArtefato(null)
        setDadosProjeto(null)
    }

    const handleReload = () => {
        setIsFormVisible(false)
        setIsFormFilterArtefatoVisible(false)
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
        setIsFormVisible(true)
        setDadosProjeto(null)
        setActionForm('create')
    }

    const handleAtualizarArtefato = async (record) => {
        await handleBuscarProjeto(record.projeto)
        setIsFormVisible(true)
        setIsFormFilterArtefatoVisible(false)
        setActionForm('update')
        setDadosArtefato(record)
    }

    const handleBuscarAutor = async (idMembroProjeto) => {

        const response = await buscarUsuarioPeloIdMembroProjeto(idMembroProjeto)
        return response
    }

    const handleSaveContent = async (dadosForm) => {
        if (!dadosProjeto.token || !dadosProjeto.nome_repo) {
            NotificationManager.info('Não é possível sincronizar com o GitHub. O projeto não possui token ou repositório configurado.');
            return { error: 'Projeto sem token ou repositório configurado' };
        }
    
        const dadosEnviar = {
            github_token: dadosProjeto.token,
            repository: dadosProjeto.nome_repo,
            path: dadosForm.path_content,
            content: dadosForm.descricao,
            commit_message: "Criando arquivo"
        };

        if (actionForm === 'create') {
            const response = await createContent(dadosEnviar)
            return response
        } else if (actionForm === 'update' && !dadosArtefato.id_content){
            const response = await createContent(dadosEnviar)
            return response
        } else if (actionForm === 'update' && dadosArtefato.path_content){
            const response = await updateIssue(dadosArtefato.path_content, dadosEnviar);
            return response
        }
    }

    const handleSalvarArtefato = async (dadosForm) => {
        setIsLoading(true);

        console.log(dadosForm)
        
        dadosForm.projeto = dadosProjeto.id;
        
        if (dadosForm['sicronizar-github']) {
            const resContent = await handleSaveContent(dadosForm);
    
            if (resContent.error) {
                setIsLoading(false);
                return;
            }
            dadosForm['id_file'] = resContent.data.sha
    
        }
    
        try {
            if (actionForm === 'create') {
                await criarArtefato(dadosForm);
            } else {
                await atualizarArtefato(dadosArtefato.id, dadosForm);
            }
            handleReload();
    
        } catch (error) {
            console.log(error)
            NotificationManager.error('Erro ao salvar a tarefa');
        }
        
        setIsLoading(false);
    };

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
        setArtefatoToDelete(parametros)
    }

    const handleExcluirArtefato = async (parametro) => {
        handleFecharModal()
        setIsLoading(true)
        const objeto = artefatoToDelete
        objeto['commit_message'] = parametro

        const response = await deleteContent(objeto)
        if(!response.error){
            await excluirArtefato(objeto.id_artefato)
        }
        handleReload()
        setIsLoading(false)
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
                    onClick={() => setIsFormFilterArtefatoVisible(!isFormFilterArtefatoVisible)}
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

            {isFormFilterArtefatoVisible && (
                <div className="global-div" style={{width: '50%'}}>   
                    <FormGenericBusca onSearch={handleBuscarArtefato} />
                </div>
            )}

            <div className="global-div"> 

                {isFormVisible && actionForm === 'create' && (
                    <React.Fragment> 
                        {isLoading && ( 
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

                {isFormVisible && actionForm === 'update' && (
                    <React.Fragment> 
                        {isLoading && ( 
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
                

                {!isFormVisible && (
                    <React.Fragment>
                        {isLoading && ( 
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
                visible={isModalToDeleteVisible}
                onCancel={handleFecharModal}
                onDelete={handleExcluirArtefato}
            />
        </React.Fragment>    
    )
}

export default AdminArtefatos