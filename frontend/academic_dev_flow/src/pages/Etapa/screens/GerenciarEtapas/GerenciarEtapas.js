import React, { useEffect, useState } from "react";
import { atualizarEtapa, buscarEtapaPeloNome, criarEtapa, excluirEtapas, listarEtapas } from "../../../../services/etapaService";
import FormEtapa from "../../components/FormEtapa/FormEtapa";
import { useContextoEtapa } from "../../context/ContextoEtapa";
import { Breadcrumb, Button, Input, Modal, Space, Tooltip } from "antd";
import { FaPlus, FaTrash } from "react-icons/fa";
import TableEtapas from "../../components/TableEtapas/TableEtapas";
import Section from "../../../../components/Section/Section";
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
import SectionFilters from "../../../../components/SectionFilters/SectionFilters";
import SectionContent from "../../../../components/SectionContent/SectionContent";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { HomeOutlined } from "@ant-design/icons";

const {Search} = Input
const GerenciarEtapas = ({grupo}) => {

    const {dadosEtapa, setDadosEtapa, etapasSelecionadas, setEtapasSelecionadas} = useContextoEtapa()
    const [etapas, setEtapas] = useState([])
    const [actionForm, setActionForm] = useState("create");
    const [isSaveFormVisible, setIsSaveFormVisible] = useState(false)

    const columnsTableEtapas = [
        {
            title: "ID",
            key: "id",
            dataIndex: "id",
        },
        {
            title: "Nome",
            dataIndex: "nome",
            key: "nome"
        },
        {
            title: "Descrição",
            dataIndex: "descricao",
            key: "descricao",
        },
        {
            title: "Ações",
            dataIndex: "action",
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Editar">
                        <span 
                            style={{color: 'var(--primary-color)', cursor: 'pointer'}}  
                            onClick={() => handleAtualizarEtapa(record)}
                        ><IoMdCreate /></span>
                    </Tooltip>
                    <Tooltip title="Excluir">
                        <span 
                            style={{color: 'var(--primary-color)', cursor: 'pointer'}} 
                            onClick={() => handleExcluirEtapaOne(record.id)}
                        ><IoMdTrash /></span>
                    </Tooltip>
                </Space>
            )
        }
    ];

    const handleListarEtapas = async () => { 
        
        const response = await listarEtapas()

        if(!response.error) {
            setEtapas(response.data)
        }
    }

    useEffect(() => {
        handleListarEtapas();
    }, []);

    const handleCancelar = async () => {
        setIsSaveFormVisible(false)
        setDadosEtapa(null)
        setEtapasSelecionadas([])
        await handleListarEtapas()
    }

    const handleReload = async () => {
        setIsSaveFormVisible(false)
        setDadosEtapa(null)
        setEtapasSelecionadas([])
        await handleListarEtapas()
    }

    const handleFiltrarEtapas = async (value) => {

        const response = await buscarEtapaPeloNome(value)
        if(!response.error) {
            setEtapas(response.data)
        }
    }   

    const handleCriarEtapa = () => {
        setActionForm('create')
        setIsSaveFormVisible(true)
        setDadosEtapa(null)
    };

    const handleAtualizarEtapa = (record) => {
        setActionForm('update')
        setIsSaveFormVisible(true)
        setDadosEtapa(record)
    }

    const handleSalvarEtapa = async (dados) => {
        
        if (actionForm === 'create'){
            await criarEtapa(dados)
        } else if (actionForm === 'update'){
            await atualizarEtapa(dados, dadosEtapa.id)
        }
        await handleReload()
    }

    const handleExcluirEtapas = async (ids) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Tem certeza que deseja excluir este(s) item(s) ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                const response = await excluirEtapas(ids)
                if (!response.error){
                    await handleReload() 
                }                
            }
        });
    }

    const handleExcluirEtapaOne = async (idEtapa) => {
        await handleExcluirEtapas([idEtapa])
    }

    const handleExcluirEtapasMany = async () => {
        const ids = etapasSelecionadas.map((item) => item.id)
        await handleExcluirEtapas(ids)
    }

    return (
        <Section>
            <SectionHeader>
                <Breadcrumb
                    items={[
                        {
                            href: `/academicflow/${grupo}/home`,
                            title: <HomeOutlined />,
                        },
                        {
                            href: `/academicflow/${grupo}/etapas`,
                            title: 'Etapas',
                        },
                        ...(isSaveFormVisible && actionForm === 'create'
                            ? [{ title: 'Cadastrar' }]
                            : []),
                        ...(isSaveFormVisible && actionForm === 'update'
                            ? [{ title: 'Atualizar' }]
                            : []),
                    ]}
                />

                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleCriarEtapa()} 
                        icon={<FaPlus />}
                    >
                        Criar Etapa
                    </Button>
                </Space>
            </SectionHeader>

            {!isSaveFormVisible && (
                <SectionFilters>
                    <Search
                        style={{width: '500px'}}
                        placeholder="pesquise pelo nome"
                        allowClear
                        enterButton="Pesquisar"
                        size="middle"
                        onSearch={handleFiltrarEtapas}
                    />

                    {etapasSelecionadas.length !== 0 && (
                        <Button
                            type="primary"
                            danger
                            icon={<FaTrash />}
                            onClick={async () => await handleExcluirEtapasMany()}
                        >
                            Excluir
                        </Button>
                    )}
                </SectionFilters>
            )}

            

            <SectionContent>
                {isSaveFormVisible ? (
                    <FormEtapa 
                        onSubmit={handleSalvarEtapa} 
                        onCancel={handleCancelar}
                    />

                ) : (
                   <TableEtapas data={etapas} columns={columnsTableEtapas} />
                )}
            </SectionContent>
        </Section>
        
           
    )
}

export default GerenciarEtapas;