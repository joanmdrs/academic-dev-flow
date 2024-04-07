import React, { useEffect, useState } from "react";
import FormGenericTarefa from "../FormGenericTarefa/FormGenericTarefa";
import { Form, Select } from "antd";
import { listarProjetos } from "../../../../services/projetoService";

const InputProjeto = () => {

    const [optionsProjetos, setOptionsProjetos] = useState(null)

    useEffect(() => {

        const fetchData = async () => {
            await handleGetProjetos()
        }
       
        fetchData()
    }, [])

    
    const handleGetProjetos = async () => {
        const response = await listarProjetos()

        const resultados = response.data.map((item) => {
            return {
                value: item.id,
                label: item.nome
            }
        })


        setOptionsProjetos(resultados)
    }

    return (
        <Form.Item>
            <Select defaultValue="Selecione o projeto" allowClear options={optionsProjetos} />
        </Form.Item>
    )
}

function FormAdminTarefa () {

    return (
        <FormGenericTarefa addtionalFields={<InputProjeto />} />
    ) 
}

export default FormAdminTarefa