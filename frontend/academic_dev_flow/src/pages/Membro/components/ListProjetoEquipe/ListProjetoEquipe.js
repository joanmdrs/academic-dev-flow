import { List, Tooltip } from "antd";
import React from "react";
import { CiFolderOn } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import RenderMembers from "../../../../components/RenderMembers/RenderMembers";

const ListProjetoEquipe = ({data}) => {

    return (
        <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={data}
            pagination={false}
            renderItem={(item, index) => (
                <List.Item
                    key={index}
                    style={{alignItems: 'center'}}
                    actions={[
                        <span  style={{color: '#000000', cursor: 'pointer'}}>
                            <Tooltip title="Visualizar">
                                <IoIosArrowForward size="15px" />
                            </Tooltip>
                        </span>
                    ]}
                >
                        <List.Item.Meta
                            avatar={<CiFolderOn />}
                            title={
                                <div style={{display: 'flex', gap: '20px'}}> 
                                    <span 
                                        className="ff-pop fw-500"
                                    > 
                                        {item.nome_projeto ? item.nome_projeto : item.nome} 
                                    </span>

                                    <RenderMembers 
                                        membros={item.equipe} 
                                        quantMembros={item.quantidade_membros} 
                                        maxAvatars={3} 
                                    />
                                </div>
                            }
                        />
                </List.Item>
            )}
        />
    )
}

export default ListProjetoEquipe