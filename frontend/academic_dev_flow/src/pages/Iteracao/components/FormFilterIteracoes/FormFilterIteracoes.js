import { Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { buscarProjetosDoMembro } from "../../../../services/membroProjetoService";

const FormFilterIteracoes = ({idMembro, onChange}) => {

    const [optionsProjetos, setOptionsProjetos] = useState([])

    const handleGetProjetos = async () => {
        const response = await buscarProjetosDoMembro(idMembro);


        if (!response.error){
            const resultados = response.data.map((item) => ({
                value: item.projeto,
                label: item.nome_projeto
            }));
            setOptionsProjetos(resultados);
        }
    };

    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    useEffect(() => {
        const fetchData = async () => {
            if (idMembro){
                await handleGetProjetos();
            }
        };

        fetchData();

    }, [idMembro]);

    return (
        <Form 
            style={{display: 'flex', gap: '10px'}}
            onValuesChange={(changedValues, allValues) => onChange(allValues)}
        >
            <Form.Item style={{margin: '0', width: '400px'}} name="nome">
                <Input name="nome" placeholder="informe o nome"/>
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
                    />
                </Form.Item>
        </Form>
    )
}

export default FormFilterIteracoes