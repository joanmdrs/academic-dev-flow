import React, { useState } from "react";
import { Modal, Form, Input } from 'antd';
import { buscar_projetos_pelo_nome } from "../../services/projeto_service";
import { Divider, List, Typography } from 'antd';
const { Item } = Form;


const ModalSearch = ({title, visible, onCancel, handleOk, label, name}) => {


    const [form] = Form.useForm();
    const [query, setQuery] = useState('');
    const [data, setData] = useState([])

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
      };


    return (
        <Modal
            title={title}
            visible={visible}
            onCancel={() => {
                onCancel()
                setData([])
            }}
            onOk={async () => {
                const response = await buscar_projetos_pelo_nome(query)
                setData(response.data)
            }}
        >
            <Form form={form} layout="vertical">
                <Item label={label} name={name} >
                    <Input
                        name="nome_projeto"
                        placeholder={label}
                        value={query}
                        onChange={handleQueryChange}
                    />
                </Item>
            </Form>

            {data.length > 0 ? (
                <>
                    <Divider orientation="left">Resultados</Divider>
                    <List
                    bordered
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                        <Typography.Text mark></Typography.Text> {item.nome}
                        </List.Item>
                    )}
                    />
                </>
            ) : null}

            

        </Modal>
    )
}

export default ModalSearch