import React, { useEffect, useState } from "react";
import { atualizarFluxo, buscarFluxoPeloNome, criarFluxo, excluirFluxo, listarFluxos } from "../../../../../services/fluxoService";
import FormFluxo from "../../../components/FormFluxo/FormFluxo";
import { Button, Form, Input, Modal, Space, Tooltip } from "antd";
import { FaFilter, FaPlus, FaTrash } from "react-icons/fa";
import { useContextoFluxo } from "../../../context/ContextoFluxo";
import TableFluxos from "../../../components/TableFluxos/TableFluxos";
import { IoMdCreate, IoMdTrash } from "react-icons/io";

const TabGerenciarFluxos = () => {

    const {dadosFluxo, setDadosFluxo} = useContextoFluxo()
    const [acaoForm, setAcaoForm] = useState("criar");
    const [isFormVisivel, setIsFormVisivel] = useState(false);
    const [isFormFilterVisible, setIsFormFilterVisible] = useState(false)
    const [fluxos, setFluxos] = useState([])

    const columnsTableFluxos = [
        {
            title: "ID",
            key: "id",
            dataIndex: "id",
        },
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

    const handleCancelar = () => {
        setIsFormVisivel(false)
        setIsFormFilterVisible(false)
        setDadosFluxo(null)
    }

    const handleReload = async () => {
        setIsFormVisivel(false)
        setIsFormFilterVisible(false)
        setDadosFluxo(null)
        await handleListarFluxos()
    }


    const handleCriarFluxo = () => {
        setAcaoForm('criar')
        setIsFormVisivel(true);
        setIsFormFilterVisible(false)
        setDadosFluxo(null)
    };

    const handleAtualizarFluxo = (record) => {
        setAcaoForm("atualizar")
        setIsFormVisivel(true)
        setIsFormFilterVisible(false)
        setDadosFluxo(record)
    }

    const handleSalvarFluxo = async (dados) => {
        if (acaoForm === 'criar'){
            await criarFluxo(dados)
        } else if (acaoForm === 'atualizar'){
            await atualizarFluxo(dados, dadosFluxo.id);
        }
        await handleReload()
    }

    const handleBuscarFluxo = async (parametro) => {
        const response = await buscarFluxoPeloNome(parametro);

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
            { isFormVisivel ? 
                (
                    <FormFluxo 
                        onSubmit={handleSalvarFluxo}
                        onCancel={handleCancelar}
                        onBack={handleCancelar} 
                    /> 
            
                )

             : (
                <React.Fragment>
                    <div style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        padding: '20px 10px'
                    }}>
                        <div > 
                            <Button 
                                type="primary"
                                icon={<FaFilter />}
                                onClick={() => setIsFormFilterVisible(!isFormFilterVisible)}
                            >
                                Filtrar
                            </Button>
                        </div>
                        <div className="grouped-buttons"> 
                            <Button 
                                type="primary"
                                icon={<FaPlus />}
                                onClick={() => handleCriarFluxo()} 
                            >
                                    Criar fluxo
                            </Button>
                        </div>
                    </div>

                    {isFormFilterVisible && (
                        <Form className="global-form" style={{width: '50%'}} onFinish={handleBuscarFluxo}>
                            <Form.Item name="nome">
                                <Input name="nome" placeholder="informe o nome do fluxo" />
                            </Form.Item>

                            <Space>
                                <Button onClick={handleCancelar}> Cancelar </Button>
                                <Button type="primary" htmlType="submit"> Filtrar </Button>
                            </Space>
                        </Form>
                    )}

                
                    <div>
                        <TableFluxos columns={columnsTableFluxos} data={fluxos} />
                        
                    </div>
                </React.Fragment>
                
                )
            }
        </div>
           
    )
    
}

export default TabGerenciarFluxos;