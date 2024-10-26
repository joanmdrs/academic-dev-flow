import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { buscarProjetosDoMembro, listarEquipesDoMembro } from "../../../../services/membroProjetoService";
import { useContextoTarefa } from "../../context/ContextoTarefa";

const FormFiltrarTarefas = ({idMembro, onChange}) => {
    const [optionsMembros, setOptionsMembros] = useState([]);
    const [optionsProjetos, setOptionsProjetos] = useState([]);
    const {tarefas, setTarefas} = useContextoTarefa();

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
            onValuesChange={(changedValues, allValues) => onChange(allValues)}  // Chama o onChange quando qualquer campo muda
        >
            <Form.Item
                name="membroSelect"
            >
                <Select
                    showSearch
                    allowClear
                    placeholder="Membro"
                    optionFilterProp="children"
                    options={optionsMembros}
                    filterOption={filterOption}
                />
            </Form.Item>

            <Form.Item
                name="projetoSelect"
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
    );
};

export default FormFiltrarTarefas;
