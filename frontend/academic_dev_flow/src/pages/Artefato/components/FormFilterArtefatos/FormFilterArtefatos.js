import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { buscarProjetosDoMembro, listarEquipesDoMembro } from "../../../../services/membroProjetoService";

const FormFilterArtefatos = ({idMembro, onChange}) => {

    const [optionsMembros, setOptionsMembros] = useState([])
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

    const handleGetMembros = async () => {
        const response = await listarEquipesDoMembro(idMembro);
        if(!response.error) {
            const resultados = response.data.map((item) => ({
                value: item.id,
                label: item.nome
            }));
            setOptionsMembros(resultados);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (idMembro){
                await handleGetMembros();
                await handleGetProjetos();
            }
        };

        fetchData();

    }, [idMembro]);

    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
            <Form
                style={{display: 'flex', gap: '10px'}}
                onValuesChange={(changedValues, allValues) => onChange(allValues)}
            >
                <Form.Item
                    style={{margin: '0'}}
                    name="membroSelect"
                >
                    <Select
                        showSearch
                        allowClear
                        placeholder="Membro"
                        optionFilterProp="children"
                        options={optionsMembros}
                        filterOption={filterOption}
                        popupMatchSelectWidth={false}
                    />
                </Form.Item>

                <Form.Item
                    style={{margin: '0'}}
                    name="projetoSelect"
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
    )
}

export default FormFilterArtefatos