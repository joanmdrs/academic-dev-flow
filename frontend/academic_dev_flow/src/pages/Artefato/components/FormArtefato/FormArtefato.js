import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useContextoArtefato } from "../../context/ContextoArtefato";
import { listarIteracoesPorProjeto } from "../../../../services/iteracaoService";
import { optionsStatusArtefatos } from "../../../../services/optionsStatus";
import { handleError } from "../../../../services/utils";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { buscarMembrosPorProjeto } from "../../../../services/membroProjetoService";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import { NotificationManager } from "react-notifications";

const FormArtefato = ({onSubmit, onCancel, selectProjeto}) => {

    const {dadosProjeto} = useContextoGlobalProjeto()
    const {dadosArtefato} = useContextoArtefato()
    const [optionsIteracao, setOptionsIteracao] = useState(null)
    const [optionsMembros, setOptionsMembros] = useState([])
    const [form] = useForm()
    const [titulo, setTitulo] = useState('CADASTRAR ARTEFATO')
    const [sincronizarGitHub, setSincronizarGitHub] = useState(false); 

    const handleGetMembros = async () => {
        try {
            const response = await buscarMembrosPorProjeto(dadosProjeto.id);
            const resultados = response.data
                .filter(item => item.nome_grupo === 'Discentes' || item.nome_grupo === 'Docentes')
                .map(item => ({
                    value: item.id,
                    label: `${item.nome_membro} (${item.nome_grupo})`,
                    user: item.usuario_github,
                }));
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

            setOptionsIteracao(resultados)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto !== null){
                await handleGetIteracoes()
                await handleGetMembros()

                if (dadosArtefato !== null) {
                    form.setFieldsValue(dadosArtefato)
                    setTitulo('ATUALIZAR ARTEFATO')

                } else {
                    form.resetFields()
                    setTitulo('CADASTRAR ARTEFATO')
                }
            }
        }

        fetchData()
    }, [dadosProjeto])

    const handleSwitchChange = (checked) => {
        setSincronizarGitHub(checked);
    };

    const handleSubmitForm = () => {

        if (dadosProjeto === null){
            NotificationManager.info("Você deve selecionar o projeto, antes de salvar o artefato !");
            return {'error': 'Selecione um projeto'}
        }
        const dadosForm = form.getFieldsValue();
        const membrosSelecionados = dadosForm.membros;
        const usuariosGithub = optionsMembros
            .filter((option) => membrosSelecionados.includes(option.value))
            .map((option) => option.user);
        dadosForm['assignees'] = usuariosGithub;
        onSubmit(dadosForm);
    };

    return (

        <Form layout="vertical" className="global-form" onFinish={handleSubmitForm} form={form}>
            <Form.Item>
                <h4 className="global-title"> {titulo} </h4>
            </Form.Item>

            {selectProjeto}

            <div style={{ display: 'flex', gap: "20px" }}>
                <div style={{flex: '2'}}>
                    <Form.Item 
                        label="Nome" 
                        name="nome"
                        rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                    >
                        <Input type="text" name="nome" placeholder="nome do artefato"/>
                    </Form.Item>

                    <Form.Item label="Descrição" name="descricao">
                        <Input.TextArea rows={4} name="descricao" placeholder="descrição do artefato"/>
                    </Form.Item>

                    <Form.Item label="Url do artefato" name="url">
                        <Input name="url" placeholder="url do artefato"/>
                    </Form.Item>

                    <Form.Item
                        label="Data de Entrega"
                        name="data_termino"
                        rules={[
                            { required: true, message: 'Por favor, preencha este campo!' }
                        ]}
                    >
                        <Input type='date' name='data_termino' style={{ width: 'fit-content' }} />
                    </Form.Item>
                </div>

                <div style={{flex: '1'}}>
                    <Form.Item
                        label="Atribuir à"
                        name="membros"
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Selecione"
                            options={optionsMembros}
                        />
                    </Form.Item>

                    <Form.Item 
                        label="Iteração" 
                        name="iteracao"
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                    >
                        <Select options={optionsIteracao} name="iteracao" defaultValue="selecione" />
                    </Form.Item>
                    
                    <Form.Item 
                        label="Status" 
                        name="status"
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                    >
                        <Select options={optionsStatusArtefatos} name="status" defaultValue="selecione" />
                    </Form.Item>

                </div>
            </div>
         
            {/* <Form.Item
                label="Sincronizar com o GitHub?"
                name="sincronizar-github"
            >
                <Switch
                    name="sincronizar-github"
                    checkedChildren="Sincronizar"
                    unCheckedChildren="Não sincronizar"
                    onChange={handleSwitchChange} // Atualiza ao mudar o switch
                />
            </Form.Item> */}

            {sincronizarGitHub && (
                <Form.Item
                    label="Informe o nome do arquivo e sua extensão"
                    name="nome_content"
                    rules={[{ required: true, message: 'Por favor, preencha o nome do arquivo!' }]}
                >
                    <Input name="nome_content" placeholder="Ex.: doc-visao.md" />
                </Form.Item>
            )}

            <Form.Item>
                <Button type="primary" htmlType="submit" > Salvar </Button>
                <Button 
                    
                    type="primary" 
                    style={{marginLeft: '10px'}} 
                    danger 
                    onClick={() => onCancel()}> Cancelar </Button>
            </Form.Item>
        </Form>
    )

}

export default FormArtefato