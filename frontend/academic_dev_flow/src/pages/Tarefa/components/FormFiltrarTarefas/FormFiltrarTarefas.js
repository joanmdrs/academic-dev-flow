import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { buscarProjetosDoMembro, listarEquipesDoMembro } from "../../../../services/membroProjetoService";

const FormFiltrarTarefas = ({idMembro, onChange}) => {

    const [optionsMembros, setOptionsMembros] = useState([]);
    const [optionsProjetos, setOptionsProjetos] = useState([]);

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
        if(!response.error && !response.empty) {
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

            style={{
                display: 'flex', 
                gap: '10px', 
                alignItems: 'center'}}
            onValuesChange={(changedValues, allValues) => onChange(allValues)}  // Chama o onChange quando qualquer campo muda
        >
            <Form.Item
                style={{margin: '0'}}
                name="membroSelect"
            >
                <Select
                    style={{minWidth: '150px'}}
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
                    style={{minWidth: '150px'}}
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

export default FormFiltrarTarefas;
