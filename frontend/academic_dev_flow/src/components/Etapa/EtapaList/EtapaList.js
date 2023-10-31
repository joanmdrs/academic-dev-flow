import { Button, List } from "antd";
import React from "react";
import "./EtapaList.css";
import { AiFillEdit } from "react-icons/ai";
import { IoMdTrash } from "react-icons/io";

const EtapaList = ({etapas}) => {

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
                                <Button> 
                                    <AiFillEdit />
                                </Button>, 
                                <Button>
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