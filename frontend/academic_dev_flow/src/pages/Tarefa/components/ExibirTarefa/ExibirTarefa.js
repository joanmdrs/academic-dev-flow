import React, { useEffect, useState } from "react";
import { Descriptions } from 'antd';
import { optionsStatusTarefas } from "../../../../services/optionsStatus";
import { listarMembrosPeloIdProjeto } from "../../../../services/membroProjetoService";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import { listarIteracoesPorProjeto } from "../../../../services/iteracaoService";
import { listarTipos } from "../../../../services/tipoService";
import { listarLabelsPorProjeto } from "../../../../services/tarefaService";

const ExibirTarefa = ({ dadosTarefa, dadosProjeto }) => {
    const [optionsMembros, setOptionsMembros] = useState([]);
    const [optionsIteracoes, setOptionsIteracoes] = useState([]);
    const [optionsTipos, setOptionsTipos] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await handleGetIteracoes();
            await handleGetMembros();
            await handleGetTipos();
        };

        fetchData();
    }, []);

    const handleGetMembros = async () => {
        try {
            const response = await listarMembrosPeloIdProjeto(dadosProjeto.id);
            const resultados = response.data.map((item) => {
                return {
                    value: item.id_membro_projeto,
                    label: `${item.nome_membro} (${item.grupo_membro})`,
                    user: item.usuario_github,
                };
            });
            setOptionsMembros(resultados);
        } catch (error) {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING);
        }
    };

    const handleGetIteracoes = async () => {
        const response = await listarIteracoesPorProjeto(dadosProjeto.id)

        if (!response.error && response.data.length > 0){
            const iteracoesOrdenadas = response.data.sort((a, b) => a.numero - b.numero);

            const resultados = iteracoesOrdenadas.map((item) => {
                return {
                    value: item.id,
                    label: item.nome
                }
            })

            setOptionsIteracoes(resultados)
        }
    }
    

    const handleGetTipos = async () => {
        const response = await listarTipos();
        if (!response.error && response.data) {
            const resultados = response.data.map((item) => {
                return {
                    value: item.id,
                    label: item.nome,
                    color: item.cor,
                };
            });
            setOptionsTipos(resultados);
        }
    };

    const findMembroLabel = (membroId) => {
        return optionsMembros.find((membro) => membro.value === membroId)?.label;
    };


    const items = [
        {
            key: "1",
            label: "Nome",
            children: dadosTarefa.nome,
        },
        {
            key: "2",
            label: "Início",
            children: dadosTarefa.data_inicio,
        },
        {
            key: "3",
            label: "Término",
            children: dadosTarefa.data_termino,
        },
        {
            key: "4",
            label: "Status",
            children: optionsStatusTarefas.find((status) => status.value === dadosTarefa.status)?.label,
        },
        {
            key: "5",
            label: "Iteração",
            children: optionsIteracoes.find((iteracao) => iteracao.value === dadosTarefa.iteracao)?.label,
        },
        {
            key: "6",
            label: "Membros",
            children: dadosTarefa.membros.map((membroId) => findMembroLabel(membroId)).join(", "),
        },
        {
            key: "7",
            label: "Tipo",
            children: optionsTipos.find((tipo) => tipo.value === dadosTarefa.tipo)?.label,
        },
        {
            key: "8",
            label: "Descrição",
            children: dadosTarefa.descricao,
        },
    ];

    return <Descriptions title="Informações da Tarefa" items={items} />;
};

export default ExibirTarefa;
