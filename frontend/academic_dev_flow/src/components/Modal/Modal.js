import React, { useState } from "react";
import "./Modal.css"
import { Modal, Form, Input, Divider, Table } from 'antd';
import { buscar_projetos_pelo_nome } from "../../services/projeto_service";

const { Item } = Form;

const ModalSearch = ({open, title, label, name, onCancel, onOk, columns}) => {


    const [form] = Form.useForm();
    const [query, setQuery] = useState('');
    const [data, setData] = useState([])

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <Modal
            title={title}
            open={open}
            onCancel={() => {
                onCancel()
                setData([])
            }}
            onOk={async () => {
                // A função onOk(query) é responsável por buscar os dados por meio da query
                const response = await onOk(query)

                if(response !== undefined) {
                    setData(response.data)
                }
            }}
        >
            <Form form={form} layout="vertical">
                <Item label={label} name={name} >
                    <Input
                        name={name}
                        placeholder={label}
                        value={query}
                        onChange={handleQueryChange}
                    />
                </Item>
            </Form>

            {data.length > 0 ? (
                <>
                <Divider orientation="left">Resultados</Divider>
                <Table dataSource={data} columns={columns} rowKey="id"/>
              </>
      
            ) : null}

            

        </Modal>
    )
}

export default ModalSearch