import React, { useEffect, useState } from "react";
import { Descriptions } from 'antd';
import { optionsStatusIteracoes } from "../../../../services/optionsStatus";
import { buscarMembrosPorProjeto } from "../../../../services/membroProjetoService";
import { formatDate, handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import { listarEtapasPorFluxo } from "../../../../services/fluxoEtapaService";
import { buscarEtapaPeloId } from "../../../../services/etapaService";
import { useContextoIteracao } from "../../context/contextoIteracao";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";

const ExibirIteracao = () => {

    const {dadosProjeto} = useContextoGlobalProjeto()
    const {dadosIteracao} = useContextoIteracao()
    const [optionsEtapas, setOptionsEtapas] = useState([]);
    const [optionsMembros, setOptionsMembros] = useState([]);

    const handleGetEtapas = async () => {
        try {
            const response = await listarEtapasPorFluxo(dadosProjeto.fluxo)

            if (!response.error){


                console.log(response.data)
                const promises = await response.data.map( async (item) => {
                    const response2 = await buscarEtapaPeloId(item.etapa)

                    return {
                        value: item.id,
                        label: response2.data.nome
                    }
                })

                const results = (await Promise.all(promises))
                setOptionsEtapas(results)
            }
            
        } catch (error) {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
        }
    }

    const handleGetMembros = async () => {

        try {
            const response = await buscarMembrosPorProjeto(dadosIteracao.projeto)
            const resultados = response.data.map((item) => {
                return {
                    value: item.id,
                    label: `${item.nome_membro} (${item.nome_grupo})`,
                }
            })
            setOptionsMembros(resultados)
        
        } catch (error) {   
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
        }
    }

    useEffect(() => {
        const fetchData = async () => {

            if (dadosIteracao !== null && dadosProjeto !== null){
                await handleGetEtapas()
                await handleGetMembros()
            }
        };

        fetchData();
    }, []);


    const items = [
        {
            key: "1",
            label: "Nome",
            children: dadosIteracao.nome,
        },
        {
            key: "2",
            label: "Início",
            children: formatDate(dadosIteracao.data_inicio),
        },
        {
            key: "3",
            label: "Término",
            children: formatDate(dadosIteracao.data_termino),
        },
        {
            key: "4",
            label: 'Número',
            children: dadosIteracao.numero
        },
        {
            key: "5",
            label: "Status",
            children: optionsStatusIteracoes.find((status) => status.value === dadosIteracao.status)?.label,
        },
        {
            key: "6",
            label: "Líder",
            children: optionsMembros.find((membro) => membro.value === dadosIteracao.lider)?.label,
        },
        {
            key: "7",
            label: "Fase",
            children: optionsEtapas.find((etapa) => etapa.value === dadosIteracao.fase)?.label,
        },
        {
            key: "8",
            label: "Descrição",
            children: dadosIteracao.descricao,
        },
    ];

    return <Descriptions title="Informações da iteração" items={items} />;
};

export default ExibirIteracao;
