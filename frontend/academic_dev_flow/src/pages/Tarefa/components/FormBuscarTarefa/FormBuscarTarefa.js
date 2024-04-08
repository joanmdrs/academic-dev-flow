import React, { useEffect, useState } from "react";
import {Form, Input, Button, Select} from 'antd'
import { listarProjetos } from "../../../../services/projetoService";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";

const FormBuscarTarefa = ({onSearch}) => {

    const [optionsProjetos, setOptionsProjetos] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

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
                return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
            }
        };
        fetchData();
    }, []);

    const handleChange = (value) => {
        setSelectedItem(value);
    };

    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const handleOnSearch = (values) => {
        onSearch(values)
    }


    return (
        <Form layout="vertical" className="global-form" onFinish={handleOnSearch}> 
            <Form.Item label='Nome' name='nome_tarefa'>
                <Input name="nome_tarefa" placeholder="nome da tarefa"/>
            </Form.Item>

            <Form.Item label='Projeto' name='id_projeto'>
                <Select
                    showSearch
                    allowClear
                    placeholder="Pesquise ou selecione o projeto"
                    optionFilterProp="children"
                    value={selectedItem}
                    onChange={handleChange}
                    options={optionsProjetos}
                    filterOption={filterOption}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Filtrar
                </Button>
            </Form.Item>
        </Form>
    )
}

export default FormBuscarTarefa