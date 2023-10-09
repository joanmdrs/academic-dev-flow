import React, { useState } from "react";
import { Modal, Form, Input } from 'antd';
import { buscar_projetos_pelo_nome } from "../../services/projeto_service";

const { Item } = Form;

const ModalSearch = ({title, visible, onCancel, handleOk, label, name}) => {
    const [form] = Form.useForm();
    const [query, setQuery] = useState('');

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
      };


    return (
        <Modal
            title={title}
            visible={visible}
            onCancel={onCancel}
            onOk={() => {
                buscar_projetos_pelo_nome(query)
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

        </Modal>
    )
}

export default ModalSearch