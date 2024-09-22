import React, { useEffect, useState } from "react";
import { buscarProjetoPeloId, listarProjetos } from "../../../../services/projetoService";
import { Select } from "antd";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";

const SelecionarProjeto = () => {
    const [optionsProjetos, setOptionsProjetos] = useState([]);
    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await listarProjetos();

                if (!response.error){
                    const resultados = response.data.map((item) => ({
                        value: item.id,
                        label: item.nome
                    }));
                    setOptionsProjetos(resultados);
                }
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
                value={ dadosProjeto ? dadosProjeto.id : null}
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
