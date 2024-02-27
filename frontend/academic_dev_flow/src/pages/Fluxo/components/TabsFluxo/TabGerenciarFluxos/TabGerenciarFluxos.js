import React, { useEffect, useState } from "react";
import "./TabGerenciarFluxos.css"
import FormDeBusca from "../../../../../components/Forms/FormDeBusca/FormDeBusca";
import ListaDados from "../../../../../components/Listas/ListaDados/ListaDados";
import { NotificationManager } from "react-notifications";
import { atualizarFluxo, buscarFluxoPeloNome, criarFluxo, excluirFluxo, listarFluxos } from "../../../../../services/fluxoService";
import BotaoFiltrar from "../../../../../components/Botoes/BotaoFiltrar/BotaoFiltrar";
import BotaoAdicionar from "../../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoAtualizar from "../../../../../components/Botoes/BotaoAtualizar/BotaoAtualizar";
import BotaoExcluir from "../../../../../components/Botoes/BotaoExcluir/BotaoExcluir";
import FormFluxo from "../../FormFluxo/FormFluxo";

const TabGerenciarFluxos = () => {

    const [acaoForm, setAcaoForm] = useState("criar");
    const [isFormVisivel, setIsFormVisivel] = useState(false);
    const [isFormFiltrarVisivel, setIsFormFiltrarVisivel] = useState(false);
    const [isBotaoAdicionarVisivel, setIsBotaoAdicionarVisivel] = useState(false);
    const [isBotaoEditarVisivel, setIsBotaoEditarVisivel] = useState(true);
    const [isBotaoExcluirVisivel, setIsBotaoExcluirVisivel] = useState(true);
    const [fluxos, setFluxos] = useState([])
    const [valoresIniciais, setValoresIniciais] = useState({})

    const COLUNAS_LISTA = [
        {
            title: "Código",
            key: "codigo",
            dataIndex: "id",
        },
        {
            title: "Nome",
            dataIndex: "nome",
            key: "nome",
        },
        {
            title: "Descrição",
            dataIndex: "descricao",
            key: "descricao",
        },
    ];

    const handleCliqueBotaoFiltrar = () => {
        setIsFormFiltrarVisivel((prevIsFormFiltrarVisivel) => !prevIsFormFiltrarVisivel);
    }

    const handleCliqueBotaoAdicionar = () => {
        setAcaoForm('criar')
        setIsFormVisivel(true);
    };

    const handleCliqueBotaoEditar = () => {
        setAcaoForm("atualizar")
        setIsFormVisivel(true)
    }

    const handleCliqueBotaoVoltar = () => {
        setIsFormVisivel(false)
        setIsBotaoAdicionarVisivel(false)
        setIsBotaoEditarVisivel(true)
        setIsBotaoExcluirVisivel(true)
        setValoresIniciais({})
    }

    const handleSelecionarFluxo = (record) => {
        setValoresIniciais(record)
        setIsBotaoAdicionarVisivel(true)
        setIsBotaoEditarVisivel(false)
        setIsBotaoExcluirVisivel(false)
    }

    const handleCriarFluxo = async (dados) => {
        try {
            const resposta = await criarFluxo(dados);
    
            if (resposta.status === 200) {
                NotificationManager.success('Fluxo criado com sucesso!');
                handleListarFluxos()
                handleCliqueBotaoVoltar()
            } else {
                NotificationManager.error('Falha ao criar o fluxo, contate o suporte!');
            }
        } catch (error) {
            console.error("Ocorreu um erro:", error);
            NotificationManager.error('Ocorreu um problema durante a operação, contate o suporte!');
        }
    }

    const handleAtualizarFluxo = async (dados) => {
        try {
            const resposta = await atualizarFluxo(dados, valoresIniciais.id);
    
            if (resposta.status === 200) {
                NotificationManager.success('Fluxo atualizado com sucesso!');
                handleListarFluxos()
                handleCliqueBotaoVoltar()
                
            } else {
                NotificationManager.error('Falha ao atualizar o fluxo, contate o suporte!');
            }
        } catch (error) {
            console.error("Ocorreu um erro:", error);
            NotificationManager.error('Ocorreu um problema durante a operação, contate o suporte!');
        }
    }

    const handleSalvarFluxo = async (dados) => {
        if (acaoForm === 'criar'){
            await handleCriarFluxo(dados)
        } else if (acaoForm === 'atualizar'){
            await handleAtualizarFluxo(dados)
        }
    }

    const handleBuscarFluxo = async (parametro) => {
        try {
            const resposta = await buscarFluxoPeloNome(parametro);

            if (resposta.status === 200) {
                setFluxos(resposta.data)
            } else {
                NotificationManager.error('Falha ao buscar os dados do fluxo, contate o suporte!')
            }

        } catch (error) {
            console.error("Ocorreu um erro:", error);
            NotificationManager.error('Ocorreu um problema durante a operação, contate o suporte!');
        }
    }

    const handleExcluirFluxo = async () => {
        try {
            const idFluxo = valoresIniciais.id
            const resposta = await excluirFluxo(idFluxo)

            if (resposta.status === 204){ 
                NotificationManager.success("Fluxo excluído com sucesso !")
                handleCliqueBotaoVoltar()
                handleListarFluxos()
            } else {
                NotificationManager.error("Falha ao excluir o fluxo, contate o suporte!");
            }
        } catch (error) {
            NotificationManager.error("Ocorreu um problema durante a operação, contate o suporte!");
        }
    }

    const handleListarFluxos = async () => { 
        try {
            const resposta = await listarFluxos()

            if(resposta.status === 200) {
                setFluxos(resposta.data)

            } else {
                NotificationManager.error("Ocorreu um problema durante a busca dos dados, contate o suporte!");
            }
        } catch (error) {
            NotificationManager.error("Ocorreu um problema durante a busca dos dados, contate o suporte!");
        }
    }

    useEffect(() => {
        handleListarFluxos();
    }, []);

    return (
        <div>
            { isFormVisivel ? 
                (<FormFluxo 
                    onSubmit={handleSalvarFluxo}
                    onBack={handleCliqueBotaoVoltar} 
                    valoresIniciais={valoresIniciais} /> 
                )

             : (
                <React.Fragment>
                    <div className="botoes-de-acao">
                        <div id="botao-filtrar"> 
                            <BotaoFiltrar funcao={handleCliqueBotaoFiltrar} />
                        </div>
                        <div id="botao-adicionar-atualizar-deletar"> 
                            <BotaoAdicionar funcao={handleCliqueBotaoAdicionar} status={isBotaoAdicionarVisivel}/>
                            <BotaoAtualizar funcao={handleCliqueBotaoEditar} status={isBotaoEditarVisivel}/>
                            <BotaoExcluir funcao={handleExcluirFluxo} status={isBotaoExcluirVisivel}/>
                        </div>
                    </div>

                    { isFormFiltrarVisivel && (<FormDeBusca executeFuncao={handleBuscarFluxo}/>) }
                
                    <div className="form-box">
                        <ListaDados colunas={COLUNAS_LISTA} dados={fluxos} onClickRow={handleSelecionarFluxo}/>
                    </div>
                </React.Fragment>
                
                )
            }
        </div>
           
    )
    
}

export default TabGerenciarFluxos;