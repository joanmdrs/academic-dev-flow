import React, { useEffect, useState } from "react";
import {Form, Select, Button, Input } from "antd";
import { useContextoArtefato } from "../../context/ContextoArtefato";
import { buscarProjetoPeloId, listarProjetos } from "../../../../services/projetoService";

const SelectProjeto = () => {
    const [optionsProjetos, setOptionsProjetos] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const {setDadosProjeto} = useContextoArtefato()

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
                console.error("Erro ao obter projetos:", error);
            }
        };
        fetchData();
    }, []);

    const handleChange = async (value) => {
        setSelectedItem(value);
        const response = await buscarProjetoPeloId(value)
        setDadosProjeto(response.data)
    };

    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    return (
            <Form.Item>
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
    );
};

export default SelectProjeto;