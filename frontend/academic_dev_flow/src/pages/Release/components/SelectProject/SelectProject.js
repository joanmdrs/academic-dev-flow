import React, { useEffect, useState } from "react";
import { Form, Select } from "antd";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { buscarProjetosDoMembro } from "../../../../services/membroProjetoService";
import { buscarProjetoPeloId, listarProjetos } from "../../../../services/projetoService";
import { useContextoRelease } from "../../context/ContextoRelease";

const SelectProject = ({idMembro}) => {
    const [optionsProjetos, setOptionsProjetos] = useState([]);
    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()
    const {actionForm} = useContextoRelease()

    useEffect(() => {
        const fetchData = async () => {
            try {

                if (idMembro) {
                    const response = await buscarProjetosDoMembro(idMembro)

                    if (!response.error){
                        const resultados = response.data.map((item) => ({
                            value: item.projeto,
                            label: item.nome_projeto
                        }))
                        setOptionsProjetos(resultados);
                    }
                } else {
                    const response = await listarProjetos();

                    if (!response.error){
                        const resultados = response.data.map((item) => ({
                            value: item.id,
                            label: item.nome
                        }));
                        setOptionsProjetos(resultados);
                    }
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
        <div style={{flex: "1"}}>
            <Form.Item
                label="Projeto"
                rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
            >
                <Select
                    disabled={actionForm === 'update' ? true : false}
                    showSearch
                    allowClear
                    value={ dadosProjeto ? dadosProjeto.id : null}
                    placeholder="Projeto"
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
