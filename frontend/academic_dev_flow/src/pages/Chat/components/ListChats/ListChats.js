import { List, Typography } from "antd";
import React from "react";

const ListChats = ({data}) => {

    return (
        <List
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={item => (
                <List.Item>
                    {item.nome}
                </List.Item>
            )}
        />
    )
}

export default ListChats