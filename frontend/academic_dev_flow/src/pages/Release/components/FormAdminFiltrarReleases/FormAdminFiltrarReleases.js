import { Button, Form, Input, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { listarProjetos } from "../../../../services/projetoService";

const FormAdminFiltrarReleases = ({onFilter, onCancel}) => {

    const [optionsProjetos, setOptionsProjetos] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await listarProjetos();
            if (!response.error){
                const resultados = response.data.map((item) => ({
                    value: item.id,
                    label: item.nome
                }));
                setOptionsProjetos(resultados);
            }
        }
        fetchData()
    }, [])



    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <Form className="global-form" layout="vertical" onFinish={onFilter}>
            <Form.Item label="Nome" name="nome">
                <Input name="nome" placeholder="Informe o nome da release" />
            </Form.Item>

            <Form.Item label="Projeto" name="projeto">
                <Select 
                    showSearch
                    allowClear
                    placeholder="Projeto"
                    optionFilterProp="children"
                    options={optionsProjetos}
                    filterOption={filterOption}
                    popupMatchSelectWidth={false}
                /> 
            </Form.Item>

            <Space>
                <Button onClick={() => onCancel()}> Cancelar </Button>
                <Button type="primary" htmlType="submit"> Filtrar </Button>
            </Space>

        </Form>
    )
}

export default FormAdminFiltrarReleases