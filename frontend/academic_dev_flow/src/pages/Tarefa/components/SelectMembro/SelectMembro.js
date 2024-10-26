import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import { listarEquipesDoMembro } from "../../../../services/membroProjetoService";

const SelectMembro = ({onChange, idMembro}) => {

    const [optionsMembros, setOptionsMembros] = useState([])

    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    useEffect( () => {
        const fetchData = async () => {
            if (idMembro){
                const response = await listarEquipesDoMembro(idMembro)
                if(!response.error) {
                    const resultados = response.data.map((item) => ({
                        value: item.id,
                        label: item.nome
                    }))
                    setOptionsMembros(resultados)
                }

            }
        }

        fetchData()

    }, [idMembro])

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap:'20px', flex: "1"}}>
            <Form.Item
                rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
            >
                <Select
                    showSearch
                    allowClear
                    placeholder="Membro"
                    optionFilterProp="children"
                    onChange={onChange}
                    options={optionsMembros}
                    filterOption={filterOption}
                />
            </Form.Item>
            
    
        </div>
        
    );
}

export default SelectMembro