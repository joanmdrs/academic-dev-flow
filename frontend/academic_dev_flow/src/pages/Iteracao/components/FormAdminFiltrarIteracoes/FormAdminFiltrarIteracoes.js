import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Space } from 'antd';
import { listarProjetos } from "../../../../services/projetoService";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";

const FormAdminFiltrarIteracoes = ({ onFilter, onCancel }) => {

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
        <Form layout="vertical" className="global-form" onFinish={onFilter}>
            <Form.Item 
                label='Nome' 
                name='nome_iteracao' 
            >
                <Input name="nome_iteracao" placeholder="nome da iteração" />
            </Form.Item>

            <Form.Item 
                label='Projeto' 
                name='id_projeto'
            >
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

export default FormAdminFiltrarIteracoes
