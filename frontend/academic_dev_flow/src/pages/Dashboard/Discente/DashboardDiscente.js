import { getDataHoraNow, limitarCaracteres } from "../../../services/utils";
import "./DashboardDiscente.css"
import React, { useEffect, useState } from "react";
import { Calendar, List, Skeleton, theme, Tooltip } from 'antd';
import { MdOutlineCircle } from "react-icons/md";
import { listarTarefasDoMembro, listarTarefasDoUsuario } from "../../../services/tarefaService";
import { useContextoGlobalUser } from "../../../context/ContextoGlobalUser/ContextoGlobalUser";

const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

const DashboardDiscente = () => {

    const [tarefas, setTarefas] = useState([])
    const {usuario} = useContextoGlobalUser()

    const { token } = theme.useToken();
    const wrapperStyle = {
        width: 300,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    console.log(getDataHoraNow())
    const list = [
        {
          loading: false,
          name: { last: 'Smith' },
          picture: { large: 'https://randomuser.me/api/portraits/men/1.jpg' },
          content: 'Trabalho 1 - Entrega próxima',
        },
        {
          loading: false,
          name: { last: 'Johnson' },
          picture: { large: 'https://randomuser.me/api/portraits/women/2.jpg' },
          content: 'Revisão do Projeto Final',
        },
        {
          loading: false,
          name: { last: 'Williams' },
          picture: { large: 'https://randomuser.me/api/portraits/men/3.jpg' },
          content: 'Apresentação de Software',
        },
        {
          loading: false,
          name: { last: 'Brown' },
          picture: { large: 'https://randomuser.me/api/portraits/women/4.jpg' },
          content: 'Relatório de Pesquisa',
        },
        {
            loading: false,
            name: { last: 'Johnson' },
            picture: { large: 'https://randomuser.me/api/portraits/women/2.jpg' },
            content: 'Revisão do Projeto Final',
          },
          {
            loading: false,
            name: { last: 'Williams' },
            picture: { large: 'https://randomuser.me/api/portraits/men/3.jpg' },
            content: 'Apresentação de Software',
          },
          {
            loading: false,
            name: { last: 'Brown' },
            picture: { large: 'https://randomuser.me/api/portraits/women/4.jpg' },
            content: 'Relatório de Pesquisa',
          }
      ];
      
    
    const handleGetTarefasDoUsuario = async () => {
        const response = await listarTarefasDoMembro(usuario.id)

        if (!response.error){
            console.log(response.data)
            setTarefas(response.data)
        } 
    }

    useEffect(() => {
        const fetchData = async () => {
            if (usuario && usuario.id){
                await handleGetTarefasDoUsuario()
            }

        }

        fetchData()
    }, [usuario])

    return (
        <div className="bloco-principal">
            <div className="caixa-direita"> 
                <div>
                    <h3> Hoje </h3>
                    <p> {getDataHoraNow()} </p>
                </div>

                <div className="minhas-tarefas box-model">
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}>
                        <h4>Minhas tarefas</h4>
                        <h5>Visualize todas</h5>
                    </div>

                    <div> 
                        <List
                            className="demo-loadmore-list"
                            itemLayout="horizontal"
                            dataSource={tarefas}
                            pagination={{
                                pageSize: 4,
                            }}
                            renderItem={(item, index) => (
                                <List.Item
                                    actions={[
                                        <a key="list-loadmore-edit">
                                            <Tooltip title={"Concluir"}>
                                                <MdOutlineCircle />
                                            </Tooltip>
                                            
                                        </a>,
                                    ]}
                                >
                                <Skeleton avatar title={false} loading={item.loading} active>
                                    <List.Item.Meta
                                        avatar={<div style={{ fontSize: '15px', fontWeight: 'bold', color: "#ddd" }}>{String(index + 1).padStart(2, '0')}</div>}
                                        title={<a href="https://ant.design">{item.nome}</a>}
                                        description={limitarCaracteres(item.descricao, 20)}
                                        />
                                </Skeleton>
                                </List.Item>
                            )}
                        />
                    </div>
                     
                </div>

                <div className="meus-artefatos box-model"> 
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}> 
                        <h4>Meus artefatos</h4>
                        <h5>Visualize todos</h5>
                    </div>

                    <div> 
                        <List
                            className="demo-loadmore-list"
                            itemLayout="horizontal"
                            dataSource={list}
                            pagination={{
                                pageSize: 4,
                            }}
                            renderItem={(item, index) => (
                                <List.Item
                                actions={[
                                    <a key="list-loadmore-edit">edit</a>,
                                ]}
                                >
                                <Skeleton avatar title={false} loading={item.loading} active>
                                    <List.Item.Meta
                                        
                                        avatar={<div style={{ fontSize: '15px', fontWeight: 'bold', color: "#ddd" }}>{String(index + 1).padStart(2, '0')}</div>}
                                        title={<a href="https://ant.design">{item.name?.last}</a>}
                                        description={item.content}
                                        />
                                </Skeleton>
                                </List.Item>
                            )}
                        />
                    </div>
                    
                </div>
            </div>

            <div className="caixa-esquerda"> 

                <div className="calendario box-model"> 
                    <div style={wrapperStyle}>
                        <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                    </div>
                </div>
               
                <div className="meus-projetos box-model">
                    Meus Projetos
                </div>

                <div className="minha-atividade box-model"> 
                    Minha Atividade
                </div>
            </div>
        </div>
    )
}

export default DashboardDiscente