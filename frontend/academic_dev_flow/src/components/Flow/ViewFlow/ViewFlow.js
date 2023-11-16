import React, { useState, useEffect } from "react";
import "./ViewFlow.css";
import { useParams } from 'react-router-dom';
import { buscar_fluxo_pelo_id } from "../../../services/flow_service";
import { Descriptions, Spin } from "antd";

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
    }, [id]); 

    if (loading) {
        return (
           <div className="spin">
                <Spin size="large" tip="loading">
                    <div className="spin-content"></div>
                </Spin>
           </div>
            
            
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="view-flow-content">
            <Descriptions title="Detalhes do fluxo">
                <Descriptions.Item label="Nome do fluxo">{fluxo.nome}</Descriptions.Item>
                <Descriptions.Item label="Descrição">{fluxo.descricao}</Descriptions.Item>
            </Descriptions>

            

        </div>
    );
};

export default ViewFlow;
