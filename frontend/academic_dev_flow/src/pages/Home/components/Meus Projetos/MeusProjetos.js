import { List, Progress, Tooltip } from "antd";
import React from "react";
import { MdOpenInNew } from "react-icons/md";
import ChartStatusProjeto from "../ChartStatusProjeto/ChartStatusProjeto";
import { CiFolderOn } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";

const MeusProjetos = ({projetos}) => {

    return (
        <div className="meus-projetos box-model">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline'}}> 
                <h3 className="ff-pop">Meus Projetos</h3>
                <a style={{fontSize: '12px', fontWeight: 'bold'}} href="/academic-dev-flow/aluno/projetos">Visualize todos</a>
            </div>

            <div> 
                <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    dataSource={projetos.slice(0, 4)}
                    pagination={false}
                    renderItem={(item, index) => (
                        <List.Item
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
                                    title={<span className="ff-pop fw-500"> {item.nome_projeto} </span>}
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