import React, { useState } from "react";
import "./Modal.css"
import { Modal, Form, Input, Divider, Table } from 'antd';
import { buscar_projetos_pelo_nome } from "../../services/projeto_service";

const { Item } = Form;

const ModalSearch = ({status, titulo, label, nome, onCancel, onOk, colunas}) => {


    const [form] = Form.useForm();
    const [parametro, setParametro] = useState('');
    const [dados, setDados] = useState([])

    const handleAlterarParametro = (event) => {
        setParametro(event.target.value);
    };

    return (
        <Modal
            title={titulo}
            open={status}
            onCancel={() => {
                onCancel()
                setDados([])
            }}
            onOk={async () => {
                // A função onOk(query) é responsável por buscar os dados por meio da query
                const response = await onOk(parametro)

                if(response !== undefined) {
                    setDados(response.data)
                }
            }}
        >
            <Form form={form} layout="vertical">
                <Item label={label} name={nome} >
                    <Input
                        name={nome}
                        placeholder={label}
                        value={parametro}
                        onChange={handleAlterarParametro}
                    />
                </Item>
            </Form>

            {dados.length > 0 ? (
                <>
                <Divider orientation="left">Resultados</Divider>
                <Table dataSource={dados} columns={colunas} rowKey="id"/>
              </>
      
            ) : null}

            

        </Modal>
    )
}

export default ModalSearch