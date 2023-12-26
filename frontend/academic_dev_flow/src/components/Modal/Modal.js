import React, { useState } from "react";
import "./Modal.css"
import { Modal, Form, Input, Divider, Table } from 'antd';
import { buscar_projetos_pelo_nome } from "../../services/projeto_service";

const { Item } = Form;

const ModalSearch = ({open, title, label, name, onCancel, onOk, handleRowClick}, ) => {


    const [form] = Form.useForm();
    const [query, setQuery] = useState('');
    const [data, setData] = useState([])



    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };



    //A constante colums representa uma lista com objetos que definem quais dados do objeto dataSource devem ser exibidos.
    // Além disso, o método render possui diversas propriedades, uma delas é o text que representa o valor da célula. Por outro lado, 
    // o record é uma convenção que representa o objeto que está sendo renderizado naquela linha. 

    const columns = [
        {
            title: 'Código',
            key: 'codigo',
            dataIndex: 'id', 
        },
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (text, record) => (

                <span
                    style={{ color: 'blue', cursor: 'pointer'}}
                    onClick = { () => {
                        handleRowClick(record)
                    }}
                >
                    {text}
                </span>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
    ];


    return (
        <Modal
            title={title}
            open={open}
            onCancel={() => {
                onCancel()
                setData([])
            }}
            onOk={async () => {
                const response = await onOk(query)

                if(response !== undefined) {
                    setData(response.data)
                }
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
                <Table dataSource={data} columns={columns} rowKey="id"/>
              </>
      
            ) : null}

            

        </Modal>
    )
}

export default ModalSearch