import React, { useEffect, useState } from "react";
import "./PageFluxo.css";
import Titulo from "../../components/Titulo/Titulo";
import { buscarFluxoPeloNome, listarFluxos } from "../../services/fluxo_service";
import InputBuscarFluxo from "./components/InputBuscarFluxo/InputBuscarFluxo";
import ListaDeFluxos from "./components/ListaDeFluxos/ListaDeFluxos";
import { NotificationManager } from "react-notifications";
import { FormProvider } from "./context/Provider/FormProvider";

const PageFluxo = () => {

    const [hasDadosFluxo, setHasDadosFluxo] = useState([])
    const [isFormVisivel, setIsFormVisivel] = useState(false)

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

    const handleExibirForm = () => {
        setIsFormVisivel(true)
    }

    const handleFecharForm = () => {
        setIsFormVisivel(false)
    }

    return (

        <FormProvider>
            < Titulo 
                titulo="Fluxos de Desenvolvimento" 
                paragrafo="Gerenciar fluxos de desenvolvimento"
            />

            

            <React.Fragment>
                <div className="div-input-buscar-fluxo-e-botao-novo-fluxo">
                    <InputBuscarFluxo  funcao={handleBuscarFluxo}/>
                </div>  
                
                <div> 
                    <ListaDeFluxos dados={hasDadosFluxo} funcaoExibirForm={handleExibirForm}/>
                </div>

            </React.Fragment>

        </FormProvider>
    )

}

export default PageFluxo; 