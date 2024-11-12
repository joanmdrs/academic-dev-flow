import React, { useEffect, useState } from "react";
import { Form, Input, Select } from 'antd';
import { listarProjetos } from "../../../../services/projetoService";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";

const FormAdminFiltrarArtefatos = ({ onChange }) => {

    const [optionsProjetos, setOptionsProjetos] = useState([]);
    const [optionsMembroProjeto, setOptionsMembroProjeto] = useState([]);

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
        <Form 
            style={{display: 'flex', gap: '10px'}}
            onValuesChange={(changedValues, allValues) => onChange(allValues)}
        >
            <Form.Item style={{margin: '0', width: '400px'}} name="nome">
                <Input name="nome" placeholder="informe o nome do artefato" />
            </Form.Item>

            <Form.Item
                style={{margin: '0'}}
                name="projeto"
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
        </Form>
    );
};

export default FormAdminFiltrarArtefatos;
