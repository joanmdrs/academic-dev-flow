import React, { useEffect, useState } from "react";
import "./TabGerenciarFluxos.css"
import FormDeBusca from "../../../../../components/Forms/FormDeBusca/FormDeBusca";
import { atualizarFluxo, buscarFluxoPeloNome, criarFluxo, excluirFluxo, listarFluxos } from "../../../../../services/fluxoService";
import FormFluxo from "../../../components/FormFluxo/FormFluxo";
import { Button, Modal, Table } from "antd";
import { FaFilter, FaPlus, FaTrash } from "react-icons/fa";
import { useContextoFluxo } from "../../../context/ContextoFluxo";

const TabGerenciarFluxos = () => {

    const {dadosFluxo, setDadosFluxo} = useContextoFluxo()
    const [fluxosSelecionados, setFluxosSelecionados] = useState([])
    const [acaoForm, setAcaoForm] = useState("criar");
    const [isFormVisivel, setIsFormVisivel] = useState(false);
    const [isFormFiltrarVisivel, setIsFormFiltrarVisivel] = useState(false);
    const isBotaoExcluirVisivel = fluxosSelecionados.length === 1 ? false : true
    const [fluxos, setFluxos] = useState([])

    const COLUNAS_FLUXOS = [
        {
            title: "Código",
            key: "codigo",
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
        setDadosFluxo(null)
    }

    const handleReload = async () => {
        setIsFormVisivel(false)
        setIsFormFiltrarVisivel(false)
        setFluxosSelecionados([])
        setDadosFluxo(null)
        await handleListarFluxos()
    }

    const handleCliqueBotaoFiltrar = () => {
        setIsFormFiltrarVisivel((prevIsFormFiltrarVisivel) => !prevIsFormFiltrarVisivel);
    }

    const handleCriarFluxo = () => {
        setAcaoForm('criar')
        setIsFormVisivel(true);
        setDadosFluxo(null)
    };

    const handleAtualizarFluxo = (record) => {
        setAcaoForm("atualizar")
        setIsFormVisivel(true)
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
        setFluxos(response.data.results)
        console.log(response)
    }

    const handleExcluirFluxo = async () => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir este item ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                const idFluxo = fluxosSelecionados.map(fluxo => fluxo.id);
                await excluirFluxo(idFluxo);
                await handleReload()
            }
        });
    }

    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
          setFluxosSelecionados(selectedRows)
        },
    };

    return (
        <div>
            { isFormVisivel ? 
                (<div className="global-div">
                    <FormFluxo 
                        onSubmit={handleSalvarFluxo}
                        onCancel={handleCancelar}
                        onBack={handleCancelar} 
                    /> 
                </div>
            
                )

             : (
                <React.Fragment>
                    <div className="button-menu">
                        <div id="botao-filtrar"> 
                            <Button 
                                type="primary" 
                                icon={<FaFilter />} 
                                onClick={() => handleCliqueBotaoFiltrar()}
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
                            <Button 
                                type="primary"
                                danger
                                icon={<FaTrash />}
                                onClick={() => handleExcluirFluxo()} 
                                disabled={isBotaoExcluirVisivel}
                            >
                                Excluir
                            </Button>
                        </div>
                    </div>

                    { isFormFiltrarVisivel && (<FormDeBusca executeFuncao={handleBuscarFluxo}/>) }
                
                    <div>
                        <Table 
                            dataSource={fluxos} 
                            columns={COLUNAS_FLUXOS} 
                            rowKey="id"
                            rowSelection={rowSelection}
                        />
                    </div>
                </React.Fragment>
                
                )
            }
        </div>
           
    )
    
}

export default TabGerenciarFluxos;