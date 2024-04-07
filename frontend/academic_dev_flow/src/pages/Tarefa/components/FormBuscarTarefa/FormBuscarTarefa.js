import React, { useEffect, useState } from "react";
import {Form, Input, Button, Select} from 'antd'
import { listarProjetos } from "../../../../services/projetoService";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";

const FormBuscarTarefa = () => {

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


    return (
        <Form layout="vertical" className="global-form">
            <Form.Item label='Nome' name='nome'>
                <Input name="nome" placeholder="nome da tarefa"/>
            </Form.Item>

            <Form.Item label='Projeto' name='projeto'>
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
                <Button type="primary">
                    Filtrar
                </Button>
            </Form.Item>
        </Form>
    )
}

export default FormBuscarTarefa