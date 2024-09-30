import React, { useEffect, useState } from "react";
import { Modal, Input, Button, Select } from 'antd';
import { MdInfo } from "react-icons/md";
import { listarIteracoesPorProjeto } from "../../../../services/iteracaoService";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";

const ModalVincularIteracao = ({visible, onUpdate, onCancel }) => {

    const {dadosProjeto} = useContextoGlobalProjeto()
    const [optionsIteracoes, setOptionsIteracoes] = useState(null)
    const [iteracaoSelecionada, setIteracaoSelecionada] = useState(null)

    const handleGetIteracoes = async () => {
        const response = await listarIteracoesPorProjeto(dadosProjeto.id)

        if (response.data.length > 0) {
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

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto !== null) {
                await handleGetIteracoes()
            }
        }

        fetchData()
    }, [])

    const handleSelecionarIteracao = (value) => {
        setIteracaoSelecionada(value)
    }

    return (
        <Modal
            title="Selecionar Iteracao"
            open={visible}
            onCancel={() => onCancel()}
            footer={[
                <Button key="cancel" onClick={() => onCancel()}>Cancelar</Button>,
                <Button 
                    key="submit" 
                    type="primary" 
                    onClick={() => onUpdate(iteracaoSelecionada)} 
                    disabled={iteracaoSelecionada !== null ? false : true}
                >Vincular</Button>,
            ]}
        >
            <Select
                allowClear
                defaultValue="Selecione"
                options={optionsIteracoes}
                onChange={(value) => handleSelecionarIteracao(value)}
            />
        </Modal>
    );
}

export default ModalVincularIteracao;
