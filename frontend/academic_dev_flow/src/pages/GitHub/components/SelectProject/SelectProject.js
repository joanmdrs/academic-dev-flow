import React, { useEffect, useState } from "react";
import { Form, Select } from "antd";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { buscarProjetoPeloId, listarProjetos } from "../../../../services/projetoService";

const SelectProject = () => {
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
            <Form.Item
                rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
            >
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
            </Form.Item>
            
       
        </div>
        
    );
};

export default SelectProject;
