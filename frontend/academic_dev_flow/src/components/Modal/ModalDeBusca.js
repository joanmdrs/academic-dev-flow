import React, { useState } from "react";
import "./ModalDeBusca.css"
import { Modal, Form, Input, Divider, Table } from 'antd';
import { buscar_projetos_pelo_nome } from "../../services/projeto_service";

const { Item } = Form;

const ModalDeBusca = ({status, titulo, label, name, onCancel, onOk, colunas}) => {


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
                const resposta = await onOk(parametro)
                if(resposta.status === 200) {
                    setDados(resposta.data.results)
                } else {
                    setDados([])
                }
            }}
        >
            <Form form={form} layout="vertical">
                <Item label={label} name={name} >
                    <Input
                        name={name}
                        placeholder={label}
                        value={parametro}
                        onChange={handleAlterarParametro}
                    />
                </Item>
            </Form>

            {dados.length > 0 ? (
                <>
                    <Divider orientation="left">Resultados</Divider>
                    <Table dataSource={dados} columns={colunas} rowKey="id" />
                </>
      
            ) : <div>Nenhum resultado encontrado</div>
        }

            

        </Modal>
    )
}

export default ModalDeBusca;