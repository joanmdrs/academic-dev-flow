import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Space } from 'antd';
import { listarProjetos } from "../../../../services/projetoService";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";

const FormAdminFiltrarArtefatos = ({ onFilter, onCancel }) => {

    const [optionsProjetos, setOptionsProjetos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listarProjetos();
                const resultados = response.data.map((item) => ({
                    value: item.id,
                    label: item.nome
                    
                }));
                setOptionsProjetos(resultados);
            } catch (error) {
                return handleError(error, ERROR_MESSAGE_ON_SEARCHING);
            }
        };
        fetchData();
    }, []);

    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <Form className="global-form" onFinish={onFilter} layout="vertical">
            <Form.Item name="nome" label="Nome">
                <Input name="nome" placeholder="informe o nome do artefato" />
            </Form.Item>

            <Form.Item name="projeto" label="Projeto">
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
    );
};

export default FormAdminFiltrarArtefatos;
