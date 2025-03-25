import React from "react";
import { filterOption } from "../../../../../services/utils";
import { Select } from "antd";
import { optionsStatusProjetos } from "../../../../../services/optionsStatus";

const FilterByStatus = ({onFilter}) => {

    return (
        <Select 
            style={{minWidth: '150px'}}
            options={optionsStatusProjetos}
            allowClear
            placeholder="Status"
            showSearch
            filterOption={filterOption}
            popupMatchSelectWidth={false}
            onChange={(value) => onFilter(value)}
    
        /> 
    )
}

export default FilterByStatus