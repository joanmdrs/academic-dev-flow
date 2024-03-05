import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useFormContext } from "../../context/ProviderIteracao/ProviderIteracao"
import { listarEtapasPorFluxo } from "../../../../../services/fluxoEtapaService";
import { buscarEtapaPeloId } from "../../../../../services/etapaService";
import { listarMembrosPorProjeto } from "../../../../../services/membroProjetoService";
import { buscarMembroPeloId } from "../../../../../services/membroService";

const baseStyle = {
    display: "flex",
    gap: "20px"
};


const OPTIONS_STATUS = [
    {
        value: 'planejamento',
        label: 'Em Planejamento'
    },
    {
        value: 'andamento',
        label: 'Em andamento'
    },
    {
        value: 'concluida',
        label: 'Concluída'
    },
    {
        value: 'cancelada',
        label: 'Cancelada'
    }
]

const FormIteracao = ({onSubmit, onCancel}) => {

    const {hasProjectData} = useFormContext()
    const [optionsEtapas, setOptionsEtapas] = useState([])
    const [optionsMembros, setOptionsMembros] = useState([])
 
    useEffect(() => {

        const fetchData = async () => {
            if (hasProjectData !== null){
                await handleGetEtapas()
                await handleGetMembros()
            }
        }

        fetchData()

    }, [])

    const handleGetEtapas = async () => {
        const response = await listarEtapasPorFluxo(hasProjectData.fluxo)

        if (response.status === 200){

            const promises = await response.data.map( async (objeto) => {
                const response2 = await buscarEtapaPeloId(objeto.etapa)

                return {
                    value: objeto.id,
                    label: response2.data.nome
                }
            })

            const results = (await Promise.all(promises))
            setOptionsEtapas(results)
        }
    }

    const handleGetMembros = async () => {
        const response = await listarMembrosPorProjeto(hasProjectData.id)

        if (response.status === 200){

            const promises = await response.data.map(async (objeto) => {
                const response2 = await buscarMembroPeloId(objeto.membro)

                return {
                    value: objeto.id,
                    label: `${response2.data.nome} (${response2.data.grupo})`

                }
            })
            const results = (await Promise.all(promises))
            setOptionsMembros(results)
        }
    }

    return (
        <div>
            <Form layout="vertical" className="global-form">
                <Form.Item>
                    <h4> CADASTRAR ITERAÇÃO </h4>
                </Form.Item>
                <div style={{...baseStyle}}>
                    <Form.Item label="Nome" name="nome" style={{ flex: "1"}}>
                        <Input type='text' name="nome" placeholder="Ex.: Iteração 1" />
                    </Form.Item>

                    <Form.Item label="Número" name="numero" >
                        <Input type="number" name="numero" />
                    </Form.Item> 

                    <Form.Item label="Status" name="status" style={{ flex: "1"}}>
                        <Select options={OPTIONS_STATUS} defaultValue="Selecione"/>
                    </Form.Item>

                </div>              

                <div style={{...baseStyle}}>
                    <Form.Item label="Data de Início" name="data_inicio">
                        <Input type="date" name="data_inicio"/>
                    </Form.Item>

                    <Form.Item label="Data de Término" name="data_fim">
                        <Input type="date" name="data_fim"/>
                    </Form.Item>

                    <Form.Item label="Fase" name="fase" style={{ flex: "1"}}>
                        <Select options={optionsEtapas} defaultValue="Selecione" />
                    </Form.Item>

                    <Form.Item label="Gerente" name="gerente" style={{ flex: "1"}}>
                        <Select options={optionsMembros} defaultValue="Selecione" />
                    </Form.Item>
                </div>

                <Form.Item label="Descrição" name="descricao">
                    <Input.TextArea  rows={4} name="descricao"/>
                </Form.Item>

                <div style={{...baseStyle}}> 
                    <Form.Item>
                        <Button type="primary"> Salvar </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button> Cancelar </Button>
                    </Form.Item>
                </div>
                

                

            </Form>
        </div>
    )
}

export default FormIteracao