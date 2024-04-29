import { Button, Spin } from "antd";
import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import TabsTarefas from "../../components/TabsTarefas/TabsTarefas";
import FormTarefa from "../../components/FormTarefa/FormTarefa";
import { createIssue, updateIssue } from "../../../../services/githubIntegration/issueService";
import { useContextoTarefa } from "../../context/ContextoTarefa";
import { atualizarTarefa, criarTarefa } from "../../../../services/tarefaService";
import { BsQuestionCircle } from "react-icons/bs";
import Aviso from "../../../../components/Aviso/Aviso";

const QuadroTarefas = () => {

    const {dadosProjeto} = useContextoGlobalProjeto()
    const {dadosTarefa} = useContextoTarefa()

    const [isFormSalvarVisivel, setIsFormSalvarVisivel] = useState(false)
    const [isBtnPlusDisabled, setIsBtnPlusDisabled] = useState(false)
    const isBtnTrashDisabled = true
    const [acaoForm, setAcaoForm] = useState('criar')
    const [isAvisoVisivel, setIsAvisoVisivel] = useState(false);
    const [isSaving, setIsSaving] = useState(false); // Estado para controlar a exibição do spinner

    const handleDuvidaClick = () => {
        setIsAvisoVisivel(true);
    };

    const handleAvisoClose = () => {
        setIsAvisoVisivel(false);
    };

    const handleCancelar = () => {
        setIsFormSalvarVisivel(false)
        setIsBtnPlusDisabled(false)
        setAcaoForm('criar')
    }

    const handleReload = () => {
        setIsFormSalvarVisivel(false)
        setAcaoForm('criar')
    }

    const handleAdicionarTarefa = () => {
        setIsFormSalvarVisivel(true)
        setIsBtnPlusDisabled(true)
        setAcaoForm('criar')
    }

    const handleSaveIssue = async (dadosForm) => {
        const dadosEnviar = {
            github_token: dadosProjeto.token,
            repository: dadosProjeto.nome_repo,
            title: dadosForm.nome,
            body: dadosForm.descricao,
            labels: dadosForm.labelsNames,
            assignees: dadosForm.assignees 
        };
    
        const response = acaoForm === 'criar' ?
            await createIssue(dadosEnviar) :
            await updateIssue(dadosTarefa.number_issue, dadosEnviar);
    
        return response;
    };
    
    const handleSalvarTarefa = async (dadosForm) => {
        setIsSaving(true); // Ativar o spinner enquanto a tarefa está sendo salva
        dadosForm['projeto'] = dadosProjeto.id;
        const resIssue = await handleSaveIssue(dadosForm);
    
        if (acaoForm === 'criar' && !resIssue.error) {
            const dadosIssue = resIssue.data;
            await criarTarefa(dadosForm, dadosIssue);
        } else if (acaoForm === 'atualizar') {
            await atualizarTarefa(dadosTarefa.id, dadosForm);
        }
        
        handleReload();
        setIsSaving(false);
    };

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
                    onClick={handleAdicionarTarefa}
                    disabled={isBtnPlusDisabled}
                >
                    Criar Tarefa
                </Button>

                <Button
                    icon={<FaTrash />}
                    danger
                    disabled={isBtnTrashDisabled}
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
                    {isSaving && ( // Renderizar o spinner se a tarefa estiver sendo salva
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Spin size="large" />
                        </div>
                    )}
                    <FormTarefa onSubmit={handleSalvarTarefa} onCancel={handleCancelar}  />
                </div>
            ) : (
                <div> 
                    <TabsTarefas />
                </div>

            )}




        </div>
    )
}   

export default QuadroTarefas;
