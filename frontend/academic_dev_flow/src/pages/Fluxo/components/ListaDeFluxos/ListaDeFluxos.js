import { Button, List } from "antd";
import React from "react";
import "./ListaDeFluxos.css";
import { FcWorkflow } from "react-icons/fc";
import { MdEdit } from "react-icons/md";
import { DeleteOutlined } from '@ant-design/icons';
import { AiOutlineFileSearch } from "react-icons/ai";


const ListaDeFluxos = ({dados}) => {

    const limitarTamanhoDescricao = (descricao, limite) => {
        if (descricao.length > limite) {
            return descricao.slice(0, limite) + "..."; 
        }
        return descricao;
    };
    
    return (
        <div className="component-lista-de-fluxos"> 
            <List
                itemLayout="horizontal"
                dataSource={dados}
                renderItem={(item, index) => (
                <List.Item className="item-fluxo">
                    <List.Item.Meta
                        avatar={<FcWorkflow size="20px" />}
                        title={item.nome}
                        description={limitarTamanhoDescricao(item.descricao, 100)}
                    />
                    <div className="botoes-acao">
                        <Button><MdEdit /></Button>
                        <Button><AiOutlineFileSearch/></Button>
                    </div>
                    

                </List.Item>
            
                )}
            />
        </div>
    )
}

export default ListaDeFluxos;