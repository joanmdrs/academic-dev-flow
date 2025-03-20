import { Input } from "antd";
import React from "react";
const { Search } = Input;
 
const FilterByName = ({onFilter}) => {

    return (
        <Search
            style={{width: '500px'}}
            placeholder="pesquise pelo nome"
            allowClear
            enterButton="Pesquisar"
            size="middle"
            onSearch={onFilter}
        />
    )
}

export default FilterByName