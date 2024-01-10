import React, { useState, useEffect } from "react";
import "./ViewFlow.css";
import { useParams } from 'react-router-dom';
import { buscarFluxoPeloId } from "../../../services/fluxo_service";
import { Descriptions, Spin } from "antd";
import { buscarEtapasPeloIdFluxo } from "../../../services/etapa_service";

const ViewFlow = () => {
    const { id } = useParams();
    const [fluxo, setFluxo] = useState({});
    const [etapas, setEtapas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleFluxoPeloId = async () => {
            try {
                const dados_fluxos = await buscarFluxoPeloId(id);
                const dados_etapas = await buscarEtapasPeloIdFluxo(id);

                setFluxo(dados_fluxos.data);
                setEtapas(dados_etapas.data);
                console.log(dados_etapas.data)
                
                
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

            <div>
                <h4>Detalhes do fluxo</h4>
                <Descriptions bordered className="flow-content">
                    <Descriptions.Item  label="Nome" span={3}>{fluxo.nome}</Descriptions.Item>
                    <Descriptions.Item label="Descrição">{fluxo.descricao}</Descriptions.Item>
                </Descriptions>
            </div>
            <div className="etapa-details">
                
                <h4>Detalhamento das etapas</h4>
                    {etapas.map(etapa => (
                       <Descriptions bordered className="etapa-content">
                            <Descriptions.Item span={3} label="Fase">{etapa.nome}</Descriptions.Item>
                            <Descriptions.Item label="Início">{etapa.data_inicio}</Descriptions.Item>
                            <Descriptions.Item label="Fim">{etapa.data_fim}</Descriptions.Item>
                            <Descriptions.Item label="Status">{etapa.status}</Descriptions.Item>
                            <Descriptions.Item label="Descrição" span={3}>{etapa.descricao}</Descriptions.Item>
                       </Descriptions>
                    ))}    
            </div>

        </div>
    );
};

export default ViewFlow;
