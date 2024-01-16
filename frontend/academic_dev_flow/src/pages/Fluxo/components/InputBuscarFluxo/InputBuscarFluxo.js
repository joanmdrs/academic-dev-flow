import React, { useState } from "react";
import { Input } from 'antd';
const { Search } = Input;

const InputBuscarFluxo = ({buscarFluxo}) => {

    const [hasParametro, setHasParametro ] = useState('');

    const handleAlterarParametroBusca = (event) => {
        setHasParametro(event.target.value);
        
    };

    return (
        <div>
            <Search 
                placeholder="Digite aqui" enterButton="Buscar" 
                size="large"
                style={{
                    borderRadius: "30px"
                }}
                onChange={handleAlterarParametroBusca}
                onSearch= { async () => {
                    await buscarFluxo(hasParametro)
                }}
            />
        </div>
    )
}

export default InputBuscarFluxo;