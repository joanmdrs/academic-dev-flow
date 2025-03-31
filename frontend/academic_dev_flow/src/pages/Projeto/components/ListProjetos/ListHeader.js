import React from "react";
import { limitarCaracteres } from "../../../../services/utils";
import RenderStatus from "../../../../components/RenderStatus/RenderStatus";
import { optionsStatusProjetos } from "../../../../services/optionsStatus";
import { Flex, Space } from "antd";

const ListHeader = ({item}) => {

    return (
        <Flex align="center" justify="space-between">
            <Space>
                <h3 style={{textTransform: 'capitalize', margin: '0'}}> {limitarCaracteres(item.nome_projeto, 100)} </h3>
                
            </Space>

            <Space>
                <RenderStatus optionsStatus={optionsStatusProjetos} propStatus={item.status_projeto} />
            </Space>

            <Space> 
                <h4> Coordenador: {item.nome_coordenador ? item.nome_coordenador : 'Não definido'} </h4>
            </Space>
{/* 
            <Space>
                <h4> Líder Técnico </h4>
            </Space> */}
        </Flex>
    )
}

export default ListHeader