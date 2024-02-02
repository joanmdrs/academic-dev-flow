import { Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";

const { Option } = Select

const TabProjeto = ({valoresIniciais}) => {

    const [estadoInterno, setEstadoInterno] = useState(valoresIniciais);

    // Use useEffect para monitorar as mudanças em valoresIniciais
    useEffect(() => {
      setEstadoInterno(valoresIniciais);
      form.setFieldsValue(estadoInterno)
    }, [estadoInterno, valoresIniciais]);

    const [form] = Form.useForm()
    return (
        <Form
            form={form}
            layout="horizontal"
            style={{marginTop: "20px"}}
            className="box"
            initialValues={estadoInterno}
          
        >
            <Form.Item label="Nome" name="nome">
                <Input
                    id="input-nome"
                    name="nome"
                />
            </Form.Item>

            <Form.Item label="Status" name="status" style={{maxWidth: 250}}>
                    <Select
                        id="status"
                        name="status"
                    >
                        <Option value="">Selecione</Option>
                        <Option value="cancelado">Cancelado</Option>
                        <Option value="em_andamento">Em andamento</Option>
                        <Option value="concluido">Concluído</Option>
                    </Select>
            </Form.Item>

            <Form.Item label="Data de Início" name="data_inicio" style={{ maxWidth: 250, float: 'left', marginRight: '10px' }}>
                <Input id="data_inicio" name="data_inicio" type="date" />
            </Form.Item>

            <Form.Item label="Data de Término" name="data_fim" style={{ maxWidth: 250, float: 'left' }}>
                <Input id="data_fim" name="data_fim" type="date" />
            </Form.Item>

            <Form.Item label="Descrição" name="descricao" style={{ clear: 'both' }}>
                <Input.TextArea id="descricao" name="descricao" rows={6} />
            </Form.Item>

        </Form>
    )

}

export default TabProjeto;