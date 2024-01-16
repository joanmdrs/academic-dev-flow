import { Button, List } from "antd";
import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoMdTrash } from "react-icons/io";

const ListaEtapas = ({dadosEtapas, funcaoBotaoEditar, funcaoBotaoExcluir }) => {

    return (
        <div>
            <List
                size="small"
                bordered
                dataSource={dadosEtapas}
                renderItem={(item, index) => (
                    <List.Item 
                        actions={
                            [ 
                                <Button onClick={ () => {
                                    funcaoBotaoEditar(item, index)
                                }}> 
                                    <AiFillEdit />
                                </Button>, 
                                <Button onClick={ () => {
                                    funcaoBotaoExcluir(item)
                                }}>
                                    <IoMdTrash />
                                </Button>
                            ]
                        }
                    >
                        {item.nome}

                    </List.Item>
                )}
            />
        </div>
    );   
}

export default ListaEtapas;