import { List, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import ChartStatusProjeto from "../ChartStatusProjeto/ChartStatusProjeto";
import { CiFolderOn } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import { Link } from "react-router-dom";

const MeusProjetos = ({projetos}) => {

    const {grupo} = useContextoGlobalUser()

    return (
        <div className="meus-projetos box-model">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}> 
                <h3 className="ff-pop">Projetos</h3>
                { grupo === 'Administradores' && <Link to={`/admin/projetos`}> Visualize todos </Link> }
                { grupo === 'Discentes' && <Link to={`/aluno/projetos`}> Visualize todos </Link> }
                { grupo === 'Docentes' && <Link to={`/professor/projetos`}> Visualize todos </Link> }

            </div>

            <div> 
                <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={projetos.slice(0, 4)}
                    pagination={false}
                    renderItem={(item, index) => (
                        <List.Item
                            key={index}
                            className="item-model"
                            actions={[
                                <a style={{color: '#000000'}}>
                                    <Tooltip title="Visualizar">
                                        <IoIosArrowForward size="15px" />
                                    </Tooltip>
                                </a>
                            ]}
                        >
                                <List.Item.Meta
                                    avatar={<CiFolderOn />}
                                    title={<span className="ff-pop fw-500"> {item.nome_projeto ? item.nome_projeto : item.nome} </span>}
                                />
                        </List.Item>
                    )}
                />
            </div>

            <div className="df "> 
                <ChartStatusProjeto projetos={projetos} width={400} heigth={400} />
            </div>


        </div>
    )
}

export default MeusProjetos