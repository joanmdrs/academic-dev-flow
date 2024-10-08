import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Modal, Spin} from 'antd'
import Titulo from "../../../../components/Titulo/Titulo";
import { FaFilter, FaPlus, FaTrash } from "react-icons/fa";
import FormArtefato from "../../components/FormArtefato/FormArtefato";
import SelectProjeto from "../../components/SelectProjeto/SelectProjeto"
import { useContextoArtefato } from "../../context/ContextoArtefato";
import { createContent } from "../../../../services/githubIntegration";
import { atualizarArtefato, buscarArtefatosPeloNomeEPeloProjeto, criarArtefato, excluirArtefato } from "../../../../services/artefatoService";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { NotificationManager } from "react-notifications";
import { updateIssue } from "../../../../services/githubIntegration/issueService";
import TableArtefatos from "../../components/TableArtefatos/TableArtefatos";
import FormFiltrarArtefatos from "../../components/FormFiltrarArtefatos/FormFiltrarArtefatos";

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
    const [actionForm, setActionForm] = useState('create')
    const [isTableVisible, setIsTableVisible] = useState(true)
    const {
        dadosArtefato, 
        setDadosArtefato, 
        setArtefatos, 
        artefatosSelecionados, 
        setArtefatosSelecionados} = useContextoArtefato()
    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const handleCancelar = () => {  
        setIsFormVisible(false)
        setIsLoading(false)
        setDadosArtefato(null)
        setDadosProjeto(null)
    }

    const handleReload = () => {
        setIsFormVisible(false)
        setIsFormFilterArtefatoVisible(false)
        setIsTableVisible(true)
        setDadosProjeto(null)
        setArtefatos([])
        setArtefatosSelecionados([])
    }

    const handleBuscarProjeto = async (id) => {
        const response = await buscarProjetoPeloId(id)
        setDadosProjeto(response.data)
    }

    const handleCriarArtefato = () => {
        setIsFormFilterArtefatoVisible(false)
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
            NotificationManager.error('Erro ao salvar a tarefa');
        }
        
        setIsLoading(false);
    };

    const handleAtualizarStatusArtefato = async (record, value) => {
        setIsTableVisible(false)
        const dados = {
            status: value
        }
        await atualizarArtefato(record.id, dados)
        handleReload()
    }

    const handleFiltrarArtefatos = async (dados) => {
        const nomeArtefato = dados.nome_artefato
        const idProjeto = dados.id_projeto
        const response = await buscarArtefatosPeloNomeEPeloProjeto(nomeArtefato, idProjeto)
        if (!response.error) {
            setArtefatos(response.data)
        }
    }

    const handleExcluirArtefato = async (ids) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir este(s) item(s)?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                setIsTableVisible(false)
                try {
                    await excluirArtefato(ids)
                    handleReload()

                } catch (error) {
                    NotificationManager.error('Erro ao excluir o artefato');
                } 
            }
        });
    };

    const handleExcluirArtefatosSelecionados = async () => {
        const ids = artefatosSelecionados.map(item => item.id);
        await handleExcluirArtefato(ids);
    };
    
    const handleExcluirArtefatoUnico = async (id) => {
        await handleExcluirArtefato([id]);
    };

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

    return (
        <React.Fragment>
            <Titulo 
                titulo='Artefatos'
                paragrafo='Artefatos > Gerenciar artefatos'
            />

            <div style={{display: 'flex', justifyContent: 'space-between', margin: '20px'}}> 
                <div>
                    <Button
                        icon={<FaFilter />} 
                        type="primary"
                        onClick={() => setIsFormFilterArtefatoVisible(!isFormFilterArtefatoVisible)}
                    >
                        Filtrar
                    </Button>
                </div>

                <div style={{display: 'flex', gap: '10px'}}> 
                    <Button 
                        icon={<FaPlus />} 
                        type="primary" 
                        onClick={handleCriarArtefato}
                    >
                        Criar Artefato
                    </Button>
                    <Button 
                        icon={<FaTrash />} 
                        type="primary" 
                        disabled={artefatosSelecionados.length === 0 ? true : false}
                        danger
                        onClick={handleExcluirArtefatosSelecionados}
                    >
                        Excluir
                    </Button>
                </div>
            </div>

            {isFormFilterArtefatoVisible && (
                <div className="global-div" style={{width: '50%'}}>   
                    <FormFiltrarArtefatos onSearch={handleFiltrarArtefatos} />
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

                        {isTableVisible && <TableArtefatos    
                            onView={handleVisualizarArtefato} 
                            onEdit={handleAtualizarArtefato} 
                            onDelete={handleExcluirArtefatoUnico}
                            onUpdateStatus={handleAtualizarStatusArtefato}
                        />}
                    </React.Fragment>
                )}
                
            </div>

        </React.Fragment>    
    )
}

export default AdminArtefatos