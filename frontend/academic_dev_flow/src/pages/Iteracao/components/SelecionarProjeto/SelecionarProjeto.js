import React, { useEffect, useState } from "react";
import { buscarProjetoPeloId, listarProjetos } from "../../../../services/projetoService";
import { Select, Button } from "antd";
import { FaLeaf } from "react-icons/fa";
import { useContextoIteracao } from "../../context/contextoIteracao";

const { Option } = Select;

const SelecionarProjeto = () => {
    const [optionsProjetos, setOptionsProjetos] = useState([]);
    const {setDadosProjeto} = useContextoIteracao()

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

        if (value !== undefined ) {
            const response = await buscarProjetoPeloId(value)
            setDadosProjeto(response.data)
        } else {
            setDadosProjeto(null)
        }
        
    };


    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap:'20px', flex: "1"}}>

            <Select
                showSearch
                allowClear
                placeholder="Pesquise ou selecione o projeto"
                optionFilterProp="children"
                onChange={handleChange}
                options={optionsProjetos}
                filterOption={filterOption}
            />
       
        </div>
        
    );
};

export default SelecionarProjeto;
