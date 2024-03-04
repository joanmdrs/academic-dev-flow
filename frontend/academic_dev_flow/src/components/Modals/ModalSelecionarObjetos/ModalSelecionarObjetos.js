import { Button, Divider, Form, Input, Modal, Table } from "antd";
import React, { useState } from "react";

const ModalSelecionarObjetos = ({title, status, onCancel, onOk, colunas, onSelect}) => {

    const [form] = Form.useForm();
    const [parametro, setParametro] = useState('');
    const [dados, setDados] = useState([])
    const [hasResposta, setHasResposta] = useState(false)
    const [objetos, setObjetos] = useState([])

    const handleResetar = () => {
        onCancel()
        form.resetFields()
        setHasResposta(false)
        setDados([])
        setParametro('')
    }

    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
          setObjetos(selectedRows)
        },
    };

    const handleSelecionarObjetos = () => {
        onSelect(objetos)
        onCancel()
    }


    return (
        <Modal 
            open={status}
            onCancel={onCancel}
            footer={
                <div style={{display: "flex", gap: "10px", justifyContent: "flex-end"}}> 
                    <Button style={{fontSize: "13px"}} type="primary" onClick={handleSelecionarObjetos} disabled={dados.length === 0}> SELECIONAR </Button>
                    <Button style={{fontSize: "13px"}} onClick={handleResetar}> FECHAR </Button>
                </div>
            }

        >
            <h4> {title} </h4>
            <Form form={form}> 
                <Form.Item>
                    <Input  type="text"/>
                </Form.Item>
                <div 
                    style={{
                        display: "flex", 
                        gap: "10px", 
                        justifyContent: "flex-start", 
                        marginBottom: "10px",
                    }}>
                    <Button style={{fontSize: "13px"}} type="primary" onClick={ async () => {
                        const resposta = await onOk(parametro)
                        setHasResposta(true)
                        if(resposta.status === 200) {
                            setDados(resposta.data.results)
                        } else {
                            setDados([])
                    }
                    }}> FILTRAR </Button>
                    <Button style={{fontSize: "13px"}} onClick={handleResetar}> LIMPAR </Button>
                </div>
            </Form>

            {hasResposta ? (
                <>
                    {hasResposta && dados.length > 0 ? (
                        <>
                            <Divider orientation="left">Resultados</Divider>
                            <Table 
                                className="global-table" 
                                dataSource={dados} 
                                columns={colunas} 
                                rowKey="id" 
                                rowSelection={rowSelection}
                            />
                        </>
                    ) : 
                        <div> Nenhum resultado encontrado </div>
                    }
                    
                </>
            ) : null
            }
           
        </Modal>
    )
}
export default ModalSelecionarObjetos;