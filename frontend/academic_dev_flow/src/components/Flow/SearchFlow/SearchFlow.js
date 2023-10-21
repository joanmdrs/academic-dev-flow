import React from "react";
import "./SearchFlow.css";
import { Input } from 'antd';
const { Search } = Input;

const SearchFlow = () => {
    return (
        <div className="search-flow">
            <Search className="input-search-flow" placeholder="Digite aqui" enterButton="Buscar" size="large" />
        </div>
    )
}

export default SearchFlow;