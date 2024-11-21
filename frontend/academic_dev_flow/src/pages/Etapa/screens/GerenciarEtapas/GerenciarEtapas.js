import React, { useEffect, useState } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import { atualizarEtapa, buscarEtapaPeloNome, criarEtapa, excluirEtapas, listarEtapas } from "../../../../services/etapaService";
import FormEtapa from "../../components/FormEtapa/FormEtapa";
import { useContextoEtapa } from "../../context/ContextoEtapa";
import { Button, Modal } from "antd";
import { FaFilter, FaPlus, FaTrash } from "react-icons/fa";
import FormFiltrarEtapas from "../../components/FormFiltrarEtapas/FormFiltrarEtapas";
import TableEtapas from "../../components/TableEtapas/TableEtapas";

const GerenciarEtapas = () => {

    const {dadosEtapa, setDadosEtapa} = useContextoEtapa()
    const [etapas, setEtapas] = useState([])
    const [etapasSelecionadas, setEtapasSelecionadas] = useState([])
    const [acaoForm, setAcaoForm] = useState("criar");
    const [isFormVisivel, setIsFormVisivel] = useState(false);
    const [isFormFiltrarVisivel, setIsFormFiltrarVisivel] = useState(false);
    const isBotaoExcluirVisivel = etapasSelecionadas.length !== 0 ? false : true

    const columnsTableEtapas = [
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
                    style={{cursor: 'pointer', color: 'var(--primary-color)'}} 
                    onClick={() => handleAtualizarEtapa(record)}
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
        setIsFormVisivel(false)
        setIsFormFiltrarVisivel(false)
        setDadosEtapa(null)
        setEtapasSelecionadas([])
        await handleListarEtapas()
    }

    const handleReload = async () => {
        setIsFormVisivel(false)
        setDadosEtapa(null)
        setEtapasSelecionadas([])
        await handleListarEtapas()
    }

    const handleCliqueBotaoFiltrar = () => {
        setIsFormFiltrarVisivel((prevIsFormFiltrarVisivel) => !prevIsFormFiltrarVisivel);
    }

    const handleFiltrarEtapas = async (formData) => {

        console.log(formData)
        const response = await buscarEtapaPeloNome(formData.nome)
        if(!response.error) {
            setEtapas(response.data)
        }
    }   

    const handleCriarEtapa = () => {
        setAcaoForm('criar')
        setIsFormVisivel(true);
        setDadosEtapa(null)
    };

    const handleAtualizarEtapa = (record) => {
        setAcaoForm("atualizar")
        setIsFormVisivel(true)
        setDadosEtapa(record)
    }

    const handleSalvarEtapa = async (dados) => {
        
        if (acaoForm === 'criar'){
            await criarEtapa(dados)
        } else if (acaoForm === 'atualizar'){
            await atualizarEtapa(dados, dadosEtapa.id)
        }
        await handleReload()
    }

    const handleExcluirEtapa = async () => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Tem certeza que deseja excluir este(s) item(s) ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                if (etapasSelecionadas !== null) {
                    const ids = etapasSelecionadas.map((item) => item.id)
                    await excluirEtapas(ids)
                    await handleReload() 
                }
            }
        });
    }

    return (
        <div className="content">

            <Titulo
                titulo='Etapas'
                paragrafo='Etapas > Gerenciar etapas'
            />


            {!isFormVisivel && (
                <div className="button-menu">
                    <Button 
                        type="primary"
                        icon={<FaFilter />}
                        onClick={() => handleCliqueBotaoFiltrar()}
                    >
                        Filtrar
                    </Button>
                    <div className="grouped-buttons"> 
                        <Button
                            type="primary"
                            onClick={() => handleCriarEtapa()} 
                            icon={<FaPlus />}
                        >
                            Criar Etapa
                        </Button>

                        <Button
                            type="primary"
                            danger
                            icon={<FaTrash />}
                            disabled={isBotaoExcluirVisivel}
                            onClick={async () => await handleExcluirEtapa()}
                        
                        >
                            Excluir
                        </Button>
                    </div>
                </div>
            )}

            {isFormFiltrarVisivel && (
                <div className="pa-20" style={{width: '50%'}}>
                    <FormFiltrarEtapas onCancel={handleCancelar} onFilter={handleFiltrarEtapas} />
                </div>
            )} 

            <div className="pa-20"> 
                {isFormVisivel ? (
                    <FormEtapa 
                        onSubmit={handleSalvarEtapa} 
                        onCancel={handleCancelar}
                    />

                ) : (
                   <TableEtapas data={etapas}  columns={columnsTableEtapas} />
                )}
        
            </div>
           
        </div>

    )
}

export default GerenciarEtapas;