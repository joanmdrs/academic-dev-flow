import React, { useState } from "react";
import "./SearchFlow.css";
import { Input } from 'antd';
const { Search } = Input;

const SearchFlow = ({buscar_fluxos}) => {

    const [query, setQuery] = useState('');

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
        
    };

    return (
        <div className="search-flow">
            <Search 
                className="input-search-flow" 
                placeholder="Digite aqui" enterButton="Buscar" 
                size="large" 
                onChange={handleQueryChange}
                onSearch= { async () => {
                    await buscar_fluxos(query)
                }}
            />
        </div>
    )
}

export default SearchFlow;