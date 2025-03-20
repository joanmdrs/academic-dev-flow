import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { listarFluxos } from "../../../../../services/fluxoService";
import { filterOption } from "../../../../../services/utils";

const FilterByFlow = ({onFilter}) => {

    const [optionsFluxo, setOptionsFluxo] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await listarFluxos()
            if (!response.error){
                const resultados = response.data.map(item => ({
                    value: item.id,
                    label: item.nome
                }))
                setOptionsFluxo(resultados)
            }
        }
        fetchData()
    }, [])
    
    return (
        <Select 
            style={{minWidth: '150px'}}
            options={optionsFluxo}
            allowClear
            placeholder="Fluxo"
            showSearch
            filterOption={filterOption}
            popupMatchSelectWidth={false}
            onChange={(value) => onFilter(value)}
        /> 
    )
}

export default FilterByFlow