import React, { useEffect, useState } from "react";
import { buscarProjetoPeloId, listarProjetos } from "../../../../services/projetoService";
import { Select, Button } from "antd";
import { FaLeaf } from "react-icons/fa";
import { useContextoTarefa } from "../../context/ContextoTarefa";

const { Option } = Select;

const SelecionarProjeto = () => {
    const [optionsProjetos, setOptionsProjetos] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const {setStep, setDadosProjeto} = useContextoTarefa()

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

    const handleChange = (value) => {
        setSelectedItem(value);
    };

    const handleProsseguir = async () => {
        const response = await buscarProjetoPeloId(selectedItem)
        setDadosProjeto(response.data)
        setStep('1')
    }

    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap:'20px', flex: "1"}}>

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

            <Button
                onClick={handleProsseguir}
                style={{width: 'fit-content'}} 
                type="primary"> Prosseguir 
            </Button>
       
        </div>
        
    );
};

export default SelecionarProjeto;
