import React, { useEffect, useState } from "react";
import { Descriptions } from 'antd';
import { optionsStatusTarefas } from "../../../../services/optionsStatus";
import { buscarMembrosPorProjeto } from "../../../../services/membroProjetoService";
import { formatDate, handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import { listarIteracoesPorProjeto } from "../../../../services/iteracaoService";
import { listarLabelsPorProjeto } from "../../../../services/tarefaService";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import OptionWithColor from "../../../../components/OptionStyle/OptionStyle";
import { listarCategoriaTarefa } from "../../../../services/categoriaTarefaService";

const ExibirTarefa = ({ dadosTarefa, dadosProjeto }) => {
    const [optionsMembros, setOptionsMembros] = useState([]);
    const [optionsIteracoes, setOptionsIteracoes] = useState([]);
    const [optionsCategorias, setOptionsCategorias] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await handleGetIteracoes();
            await handleGetMembros();
            await handleGetCategorias();
        };

        fetchData();
    }, []);

    const handleGetMembros = async () => {
        try {
            const response = await buscarMembrosPorProjeto(dadosProjeto.id);
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
    

    const handleGetCategorias = async () => {
        const response = await listarCategoriaTarefa();
        if (!response.error && response.data) {
            const resultados = response.data.map((item) => {
                return {
                    value: item.id,
                    label: item.nome,
                    color: item.cor,
                };
            });
            setOptionsCategorias(resultados);
        }
    };

    const findMembroLabel = (membroId) => {
        return optionsMembros.find((membro) => membro.value === membroId)?.label;
    };

    const categoriaTarefa = optionsCategorias.find((option) => option.value === dadosTarefa.categoria);



    const items = [
        {
            key: "1",
            label: "Nome",
            children: dadosTarefa.nome,
        },
        {
            key: "2",
            label: "Início",
            children: formatDate(dadosTarefa.data_inicio),
        },
        {
            key: "3",
            label: "Término",
            children: formatDate(dadosTarefa.data_termino),
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
            label: "Categoria",
            children: categoriaTarefa ? (
                <OptionWithColor label={categoriaTarefa.label} color={categoriaTarefa.color} />
            ) : null,
        },
        {
            key: "8",
            label: "Descrição",
            children: dadosTarefa.descricao
        },
    ];

    return <Descriptions title="Informações da Tarefa" items={items} />;
};

export default ExibirTarefa;
