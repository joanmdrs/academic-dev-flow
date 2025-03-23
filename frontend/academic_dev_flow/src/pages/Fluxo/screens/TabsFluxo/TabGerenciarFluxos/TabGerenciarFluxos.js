import React, { useEffect, useState } from "react";
import { atualizarFluxo, buscarFluxoPeloNome, criarFluxo, excluirFluxo, listarFluxos } from "../../../../../services/fluxoService";
import FormFluxo from "../../../components/FormFluxo/FormFluxo";
import { Button, Form, Input, Modal, Space, Tooltip } from "antd";
import { FaFilter, FaPlus, FaTrash } from "react-icons/fa";
import { useContextoFluxo } from "../../../context/ContextoFluxo";
import TableFluxos from "../../../components/TableFluxos/TableFluxos";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { useForm } from "antd/es/form/Form";
import SectionFilters from "../../../../../components/SectionFilters/SectionFilters";
import SectionHeader from "../../../../../components/SectionHeader/SectionHeader";
import SectionContent from "../../../../../components/SectionContent/SectionContent";
const { Search } = Input;

const TabGerenciarFluxos = () => {

    const {dadosFluxo, setDadosFluxo} = useContextoFluxo()
    const [actionForm, setActionForm] = useState("create");
    const [isSaveFormVisible, setIsSaveFormVisible] = useState(false);
    const [fluxos, setFluxos] = useState([])

    const columnsTableFluxos = [
        {
            title: "Nome",
            dataIndex: "nome",
            key: "nome",
            render: (_, record) => (
                <span 
                    style={{color: 'var(--primary-color)', cursor: 'pointer'}} 
                    onClick={() => handleAtualizarFluxo(record)}
                > 
                    {record.nome}
                </span>
            )
        },
        {
            title: "Descrição",
            dataIndex: "descricao",
            key: "descricao",
        },
        {
            title: "Ações",
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Editar">
                        <span 
                            style={{color: 'var(--primary-color)', cursor: 'pointer'}}  
                            onClick={() => handleAtualizarFluxo(record)}
                        ><IoMdCreate /></span>
                    </Tooltip>
                    <Tooltip title="Excluir">
                        <span 
                            style={{color: 'var(--primary-color)', cursor: 'pointer'}} 
                            onClick={() => handleExcluirFluxo(record.id)}
                        ><IoMdTrash /></span>
                    </Tooltip>
                </Space>
            )
        }
    ];

    const handleListarFluxos = async () => { 
        const resposta = await listarFluxos()
        setFluxos(resposta.data)
    }

    useEffect(() => {
        const fetchData = async () => {
            await handleListarFluxos()
        }
        fetchData()
    }, []);

    const handleCancelar = async () => {
        setIsSaveFormVisible(false)
        setDadosFluxo(null)
        await handleListarFluxos()
    }

    const handleReload = async () => {
        setIsSaveFormVisible(false)
        setDadosFluxo(null)
        await handleListarFluxos()
    }


    const handleCriarFluxo = () => {
        setActionForm('create')
        setIsSaveFormVisible(true)
        setDadosFluxo(null)
    };

    const handleAtualizarFluxo = (record) => {
        setActionForm('update')
        setIsSaveFormVisible(true)
        setDadosFluxo(record)
    }

    const handleSalvarFluxo = async (dados) => {
        if (actionForm === 'create'){
            await criarFluxo(dados)
        } else if (actionForm === 'update'){
            await atualizarFluxo(dados, dadosFluxo.id);
        }
        await handleReload()
    }

    const handleBuscarFluxo = async (value) => {
        const response = await buscarFluxoPeloNome(value);

        if (!response.error){
            setFluxos(response.data.results)
        }
    }

    const handleExcluirFluxo = async (idFluxo) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir o fluxo ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                await excluirFluxo(idFluxo);
                await handleReload()
            }
        });
    }

    


    return (
        <div>
            <SectionHeader>
                <h2 className="title"> Fluxos 
                    {isSaveFormVisible && actionForm==='create' && (
                        <span className="subtitle"> / Cadastrar fluxo</span>
                    )}

                    {isSaveFormVisible && actionForm==='update' && (
                        <span className="subtitle"> / Atualizar fluxo</span>
                    )}

                </h2>
            </SectionHeader>
                
            {!isSaveFormVisible && (
                <div 
                    style={{
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        paddingTop: '30px', 
                        paddingBottom: '30px',
                    }}>
                    <Search
                        style={{width: '500px'}}
                        placeholder="pesquise pelo nome"
                        allowClear
                        enterButton="Pesquisar"
                        size="middle"
                        onSearch={handleBuscarFluxo}
                    />

                    <Button 
                        type="primary"
                        icon={<FaPlus />}
                        onClick={() => handleCriarFluxo()} 
                    >
                        Criar fluxo
                    </Button>
                </div>
            )}

            <SectionContent>
                { isSaveFormVisible ? 
                    (
                        <FormFluxo 
                            onSubmit={handleSalvarFluxo}
                            onCancel={handleCancelar}
                        /> 
                    ) : (
                        <TableFluxos columns={columnsTableFluxos} data={fluxos} />
                    )
                }
            </SectionContent>

        </div>
    ) 
}

export default TabGerenciarFluxos;