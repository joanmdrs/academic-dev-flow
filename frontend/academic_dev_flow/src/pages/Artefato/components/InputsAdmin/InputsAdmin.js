import React, { useEffect, useState } from "react";
import {Form, Input, Select} from 'antd'
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { listarMembrosPeloIdProjeto } from "../../../../services/membroProjetoService";
import { handleInfo } from "../../../../services/utils";

const InputsAdmin = () => {

    const {dadosProjeto} = useContextoGlobalProjeto()
    const [optionsMembros, setOptionsMembros] = useState(null)

    const handleGetMembros = async () => {
        const response = await listarMembrosPeloIdProjeto(dadosProjeto.id);

        if (response.data && response.data.length > 0){
            const resultados = response.data.map((item) => ({
                value: item.id_membro_projeto,
                label: `${item.nome_membro} (${item.grupo_membro})`,
                user: item.usuario_github,  
            }));
            setOptionsMembros(resultados);
        } else {
            return handleInfo(response, "Não existem membros vinculados ao projeto selecionado. Vincule os membros antes de criar o artefato")
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto !== null){
                await handleGetMembros()
            }
        }

        fetchData()
    }, [dadosProjeto])


    return (
        <>
            <Form.Item
                label="Atribuir à"
                name="membro"
                rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
            >
                <Select
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Selecione"
                    options={optionsMembros}
                />
            </Form.Item>

            <Form.Item 
                label="Mensagem de commit" 
                name="commit_message"
                rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
            >
                <Input name="commit_message" placeholder="mensagem de commit"/>
            </Form.Item>
        </>
    )
}

export default InputsAdmin