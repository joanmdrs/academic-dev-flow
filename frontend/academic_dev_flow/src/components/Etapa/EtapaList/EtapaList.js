import { Button, List } from "antd";
import React from "react";
import "./EtapaList.css";
import { AiFillEdit } from "react-icons/ai";
import { IoMdTrash } from "react-icons/io";

const EtapaList = ({etapas, onSetFieldsEtapaForm, onDeleteEtapaItem }) => {

    return (
        <div className="list-etapa">
            <List
                size="small"
                bordered
                dataSource={etapas}
                renderItem={(item, index) => (
                    <List.Item 
                        actions={
                            [ 
                                <Button onClick={ () => {
                                    onSetFieldsEtapaForm(item, index)
                                }}> 
                                    <AiFillEdit />
                                </Button>, 
                                <Button onClick={ () => {
                                    onDeleteEtapaItem(item)
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

export default EtapaList;