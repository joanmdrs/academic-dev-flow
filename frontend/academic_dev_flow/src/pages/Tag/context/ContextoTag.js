import React, { createContext, useContext, useState } from "react";
const ContextoTag = createContext();

export const useContextoTag = () => useContext(ContextoTag);

export const ProviderTag = ({ children }) => {

    const [dadosTag, setDadosTag] = useState(null)
    const [tags, setTags] = useState([])
    const [tagsSelect, setTagsSelect] = useState([])

    return (
        <ContextoTag.Provider
            value={{
                dadosTag, setDadosTag,
                tags, setTags,
                tagsSelect, setTagsSelect
            }}
        >
            {children}
        </ContextoTag.Provider>
    );
};
