import { Form, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { listarMembros } from "../../../../services/membroService";
import { useForm } from "antd/es/form/Form";
import { buscarMembrosPorProjeto } from "../../../../services/membroProjetoService";

const ModalSelectMembros = ({idProjeto, isModalVisible, onSubmit, onCancel}) => {

    const [optionsMembros, setOptionsMembros] = useState([])
    const [form] = useForm()
    useEffect(() => {
        const fetchData = async () => {

            
            const response = await listarMembros();
            if (!response.error){
                const resultados = response.data.map((item) => ({
                    value: item.id,
                    label: `${item.nome} - ${item.nome_grupo} `,
                }));
                setOptionsMembros(resultados);
            }
            
            
        }
        fetchData()
    }, [])

    return (
        <Modal
            title={<span style={{fontSize: '18px'}}> Selecione o(s) membro(s)</span>}
            open={isModalVisible}
            onOk={() => onSubmit(form.getFieldsValue())}
            onCancel={() => {
                form.resetFields()
                onCancel()
            }}
            okText="Confirmar"
            cancelText="Cancelar"
        > 
            <Form form={form}>
                <Form.Item name="membros" >
                    <Select
                        mode="multiple"
                        showSearch
                        allowClear
                        placeholder="Pesquise ou selecione o membro"
                        options={optionsMembros}
                        filterOption={(input, option) =>
                            option?.label.toLowerCase().includes(input.toLowerCase())
                        }
                    />
                </Form.Item>
            </Form>
        </Modal>
            
    )
}

export default ModalSelectMembros