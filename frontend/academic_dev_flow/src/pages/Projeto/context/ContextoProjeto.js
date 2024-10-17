import React, { createContext, useContext, useState }  from "react";

const ContextoProjeto = createContext();

export const useContextoProjeto = () => useContext(ContextoProjeto);

export const ProviderProjeto = ({ children }) => {

    const [hasProjeto, setHasProjeto] = useState(null);
    const [hasMembros, setHasMembros] = useState([]);
    const [membrosSelecionados, setMembrosSelecionados] = useState([]);

    console.log('Membros selecionados', membrosSelecionados)
    return (
        <ContextoProjeto.Provider 
            value={{ 
                hasProjeto,
                setHasProjeto,
                hasMembros,
                setHasMembros,
                membrosSelecionados, 
                setMembrosSelecionados
            }}
        >
          {children}
        </ContextoProjeto.Provider>
    )

}