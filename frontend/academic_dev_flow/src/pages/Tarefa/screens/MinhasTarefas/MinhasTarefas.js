import { Button, Col, Form, Result, Row, Select, Tabs } from "antd";
import "./MinhasTarefas.css"
import React, { useEffect, useState } from "react";
import { buscarProjetosDoMembro } from "../../../../services/membroProjetoService";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import { ConsoleSqlOutlined, SmileOutlined } from "@ant-design/icons";
import Titulo from "../../../../components/Titulo/Titulo";
import CardTarefa from "../../components/CardTarefa/CardTarefa";
import { listarTarefasPorProjeto } from "../../../../services/tarefaService";
import ListTarefas from "../../components/ListTarefas/ListTarefas";
import { FaPlus, FaThList } from "react-icons/fa";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { IoCalendarClearSharp } from "react-icons/io5";


const {TabPane} = Tabs

const MinhasTarefas = () => {

    const {autor} = useContextoGlobalProjeto()
    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()
    const [optionsProjetos, setOptionsProjetos] = useState([])
    const [selectProjeto, setSelectProjeto] = useState(null)
    const [tarefasParaFazer, setTarefasParaFazer] = useState([])
    const [tarefasEmAndamento, setTarefasEmAndamento] = useState([])
    const [tarefasEmRevisao, setTarefasEmRevisao] = useState([])
    const [tarefasConcluidas, setTarefasConcluidas] = useState([])

    const handleGetProjetos = async () => {
        const resMembroProjeto = await buscarProjetosDoMembro(autor.id_user);

        const dados = await Promise.all(resMembroProjeto.data.map(async (membroProjeto) => {

            const resProjeto = await buscarProjetoPeloId(membroProjeto.projeto)

            if (!resProjeto.error) {
                return {
                    value: resProjeto.data.id,
                    label: resProjeto.data.nome
                }
            }      
        }))
        setOptionsProjetos(dados)
    }

    const handleGetTarefas = async () => {
        const response = await listarTarefasPorProjeto(dadosProjeto.id);
        if (!response.error) {
            const tasks = response.data;

            setTarefasParaFazer(tasks.filter(task => task.status === 'criada'));
            setTarefasEmAndamento(tasks.filter(task => task.status === 'andamento'));
            setTarefasEmRevisao(tasks.filter(task => task.status === 'pendente de revisão'));
            setTarefasConcluidas(tasks.filter(task => task.status === 'concluida'));
        }
    };

    const handleSelectProjeto = async (value) => {
        setSelectProjeto(value)

        if (value !== undefined) {
            const response = await buscarProjetoPeloId(value)
            if (!response.error){
                setDadosProjeto(response.data)
            }
        } else {
            setDadosProjeto(null)
        }
    }

    useEffect(() => {
        const fetchData = async () => {

            if (autor && autor.id_user){
                await handleGetProjetos()
            }

            if (dadosProjeto) {
                await handleGetTarefas()
            }
        }

        fetchData()
    }, [autor, dadosProjeto])

    return (
        <div>

            <div style={{margin: '20px'}}>
                <h2> Minhas Tarefas </h2>  
            </div>

            <div style={{borderRadius: '20px', border: '1px solid #ddd', margin: '2%'}}>

                <div style={{
                    display: 'flex', 
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    margin: '20px', 
                    marginTop: '30px',
                }}>

                    <div style={{width: '50%'}}> 
                        {dadosProjeto !== null && (
                            <h3 style={{
                                border: '1px solid var(--primary-color)',
                                backgroundColor: 'var(--primary-color)',
                                color: '#fff',
                                width: 'fit-content', 
                                padding: '10px 20px',
                                borderRadius: '20px',
                                fontWeight: '400',
                                fontSize: '15px'
                            }}> {dadosProjeto.nome} </h3>
                        )}
                    </div>

                    <div style={{display: 'flex', gap: '10px', width: '50%', justifyContent: 'flex-end'}}> 
                        {/* <div style={{display: 'flex', gap: '10px'}}> 
                            <Button icon={<FaThList />}></Button>
                            <Button icon={<BsFillGrid1X2Fill />}></Button>
                            <Button icon={<IoCalendarClearSharp />}></Button>
                        </div> */}
                        <Button 
                            icon={<FaPlus />}
                            type="primary"
                        >
                            Adicionar Tarefa
                        </Button>
                        <Form.Item>
                            <Select
                                allowClear
                                onChange={handleSelectProjeto}
                                defaultValue="Projeto"
                                options={optionsProjetos}
                            />

                        </Form.Item>
                    </div>
                </div>

                <div style={{margin: '20px'}} className="minhas-tarefas-conteudo">
                    <Tabs>
                        <TabPane tab="Para fazer" key="1" style={{marginTop: '50px'}}>
                            <ListTarefas dados={tarefasParaFazer} />
                        </TabPane>

                        <TabPane tab="Em andamento" key="2">
                            <ListTarefas dados={tarefasEmAndamento} />
                        </TabPane>

                        <TabPane tab="Em revisão" key="3">
                            <ListTarefas dados={tarefasEmRevisao} />
                        </TabPane>

                        <TabPane tab="Concluídas" key="4">
                            <ListTarefas dados={tarefasConcluidas} />
                        </TabPane>

                    </Tabs>

                </div>

            </div>


            

            { dadosProjeto === null && (
                <Result
                icon={<SmileOutlined />}
                title="Tarefas"
                subTitle="Selecione o projeto para poder exibir as suas tarefas."
              />
            )

            }

        </div>
    )
}

export default MinhasTarefas