import React, { useEffect, useState } from "react";
import "./PageFluxo.css";
import Titulo from "../../components/Titulo/Titulo";
import { buscarFluxoPeloNome, listarFluxos } from "../../services/fluxo_service";
import InputBuscarFluxo from "./components/InputBuscarFluxo/InputBuscarFluxo";
import BotaoNovoFluxo from "./components/BotaoNovoFluxo/BotaoNovoFluxo";
import TabsFluxo from "./components/Tabs/TabsFluxo";
import ListaDeFluxos from "./components/ListaDeFluxos/ListaDeFluxos";
import { NotificationManager } from "react-notifications";

const PageFluxo = () => {

    const [hasDadosFluxo, setHasDadosFluxo] = useState([])
    const [isFormVisivel, setIsFormVisivel] = useState(false)

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

    const handleListarFluxos = async () => { 
        
        try {
            const resposta = await listarFluxos()

            if(resposta.status === 200) {
                setHasDadosFluxo(resposta.data)

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

    const handleBuscarFluxo = async (parametro) => {
        const resposta = await buscarFluxoPeloNome(parametro);
        setHasDadosFluxo(resposta.data)
    }

    const handleCliqueBotaoNovoFluxo = () => {
        setIsFormVisivel(true)
    }

    const handleCliqueBotaoVoltar = () => {
        setIsFormVisivel(false)
    }

    return (

        <div>
            < Titulo 
                titulo="Fluxos de Desenvolvimento" 
                paragrafo="Gerenciar fluxos de desenvolvimento"
            />

            { isFormVisivel ? (
                <TabsFluxo funcaoBotaoVoltar={handleCliqueBotaoVoltar}/>
            ) : (

                <React.Fragment>
                    <div className="div-input-buscar-fluxo-e-botao-novo-fluxo">
                        <InputBuscarFluxo  funcao={handleBuscarFluxo}/>
                        <BotaoNovoFluxo funcao={handleCliqueBotaoNovoFluxo} />
                    </div>  
                    
                    <div> 
                        <ListaDeFluxos dados={hasDadosFluxo} colunas={COLUNAS_LISTA}/>
                    </div>

                </React.Fragment>

                
            )}

         
           
        </div>
    )

}

export default PageFluxo; 