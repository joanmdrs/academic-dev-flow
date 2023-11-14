import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { buscar_fluxo_pelo_id } from "../../../services/flow_service";

const ViewFlow = () => {
    const { id } = useParams();
    const [fluxo, setFluxo] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleFluxoPeloId = async () => {
            try {
                const response = await buscar_fluxo_pelo_id(id);
                setFluxo(response.data);
            } catch (error) {
                setError(error.message || 'Ocorreu um erro ao buscar o fluxo.');
            } finally {
                setLoading(false);
            }
        };

        handleFluxoPeloId();
    }, [id]); // Executa apenas quando o 'id' muda

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {fluxo.nome}
            {/* Restante da renderização do componente usando 'fluxo' */}
        </div>
    );
};

export default ViewFlow;
