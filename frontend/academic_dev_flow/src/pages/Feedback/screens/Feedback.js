import React, { useEffect, useState } from "react";
import Section from "../../../components/Section/Section";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import { Breadcrumb, Button, Modal } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { FaPlus } from "react-icons/fa";
import SectionContent from "../../../components/SectionContent/SectionContent";
import FormFeedback from "../components/FormFeedback/FormFeedback";
import TableFeedbacks from "../components/TableFeedback/TableFeedback";
import { atualizarFeedback, cadastrarFeedback, excluirFeedbacks, filtrarFeedbackByCreated, listarFeedback } from "../../../services/feedbackService";
import { useContextoFeedback } from "../context/ContextoFeedback";

const Feedback = ({grupo}) => {

    const [isSaveFormVisible, setIsSaveFormVisible] = useState(false)
    const [actionForm, setActionForm] = useState('create')
    const [feedbacks, setFeedbacks] = useState([])
    const {dadosFeedback, setDadosFeedback, feedbacksSelecionados, setFeedbacksSelecionados} = useContextoFeedback()

    const handleListarFeedbacks = async () => { 

        if (grupo === 'professor' || grupo === 'admin'){
            const response = await listarFeedback()

            if(!response.error) {
                setFeedbacks(response.data)
            }
        } else {
            const response = await filtrarFeedbackByCreated()
            if (!response.error){
                setFeedbacks(response.data)
            }
        }
        
        
    }


    useEffect(() => {
        const fetchData = async () => {
            await handleListarFeedbacks()
        }

        fetchData()

    }, []);

    const handleCancelar = async () => {
        setIsSaveFormVisible(false)
        setDadosFeedback(null)
        setFeedbacksSelecionados([])
        await handleListarFeedbacks()
        
    }

    const handleReload = async () => {
        setIsSaveFormVisible(false)
        setDadosFeedback(null)
        setFeedbacksSelecionados([])
        await handleListarFeedbacks()
    }



    const handleCadastrarFeedback = () => {
        setActionForm('create')
        setIsSaveFormVisible(true)
        setDadosFeedback(null)
    };

    const handleAtualizarFeedback = (record) => {
        setActionForm('update')
        setIsSaveFormVisible(true)
        setDadosFeedback(record)
    }

    const handleSalvarFeedback= async (dados) => {
        
        if (actionForm === 'create'){
            await cadastrarFeedback(dados)
        } else if (actionForm === 'update'){
            await atualizarFeedback(dadosFeedback.id, dados)
        }
        await handleReload()
    }

    const handleExcluirFeedbacks = async (ids) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Tem certeza que deseja excluir este(s) item(s) ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                const response = await excluirFeedbacks(ids)
                if (!response.error){
                    await handleReload() 
                }                
            }
        });
    }

    const handleExcluirFeedbackOne = async (idFeedback) => {
        await handleExcluirFeedbacks([idFeedback])
    }

    const handleExcluirFeedbacksMany = async () => {
        const ids = feedbacksSelecionados.map((item) => item.id)
        await handleExcluirFeedbacks(ids)
    }

    return (
        <Section>
            <SectionHeader>
                <Breadcrumb
                    items={[
                        {
                            href: `/academicflow/${grupo}/home`,
                            title: <HomeOutlined />,
                        },
                        {
                            href: `/academicflow/${grupo}/feedbacks`,
                            title: 'Feedbacks',
                        },
                        ...(isSaveFormVisible && actionForm === 'create'
                            ? [{ title: 'Cadastrar' }]
                            : []),
                        ...(isSaveFormVisible && actionForm === 'update'
                            ? [{ title: 'Atualizar' }]
                            : []),
                    ]}
                />

                {!isSaveFormVisible && (
                    <Button
                        type="primary"
                        icon={<FaPlus />}
                        onClick={() => handleCadastrarFeedback()}
                    > 
                        Cadastrar feedback
                    </Button>
                )}
            </SectionHeader>

            <SectionContent>

                {feedbacksSelecionados.length !== 0 && (
                    <Button
                        style={{marginBottom: '10px'}}
                        type="primary"
                        danger
                        onClick={() => handleExcluirFeedbacksMany()}
                    > 
                        Excluir
                    </Button>
                )}
                {isSaveFormVisible ? (
                    <FormFeedback onCancel={handleCancelar} onSubmit={handleSalvarFeedback} />
                ) : (
                    <TableFeedbacks 
                        data={feedbacks} 
                        onDelete={handleExcluirFeedbackOne} 
                        onUpdate={handleAtualizarFeedback} 
                    />
                )}
            </SectionContent>
        </Section>
    )
}

export default Feedback