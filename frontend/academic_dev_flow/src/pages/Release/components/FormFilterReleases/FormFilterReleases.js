import { Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { buscarProjetosDoMembro } from "../../../../services/membroProjetoService";
import { listarProjetos } from "../../../../services/projetoService";

const FormFilterReleases = ({idMembro, onChange}) => {

    const [optionsProjetos, setOptionsProjetos] = useState([])

    const handleGetProjetos = async () => {
        if (idMembro) {
            const response = await buscarProjetosDoMembro(idMembro);
            if (!response.error){
                const resultados = response.data.map((item) => ({
                    value: item.projeto,
                    label: item.nome_projeto
                }));
                setOptionsProjetos(resultados);
            }
        } else {
            const response = await listarProjetos();
            if (!response.error){
                const resultados = response.data.map((item) => ({
                    value: item.projeto,
                    label: item.nome
                }));
                setOptionsProjetos(resultados);
            }
        }        
    };

    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    useEffect(() => {
        const fetchData = async () => {
            await handleGetProjetos()
        };

        fetchData();

    }, [idMembro]);

    return (
        <Form 
            style={{display: 'flex', gap: '10px'}}
            onValuesChange={(changedValues, allValues) => onChange(allValues)}
        >
            <Form.Item style={{margin: '0', width: '400px'}} name="nome">
                <Input name="nome" placeholder="Pesquise pelo nome do lançamento" />
            </Form.Item>

            <Form.Item
                style={{margin: '0'}}
                name="projeto"
            >
                <Select
                    style={{width: '150px'}}
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
    )
}

export default FormFilterReleases