import React, { useState, useEffect } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import { Button, Spin } from "antd";
import { FaGithub, FaSearch } from "react-icons/fa";
import FormListarArquivos from "../../components/FormListarArquivos/FormListarArquivos";
import { listContents } from "../../../../services/githubIntegration";
import ListaArquivos from "../../components/ListaArquivos/ListaArquivos";
import { NotificationManager } from "react-notifications";

const GerenciarArquivosGithub = () => {

    const [arquivos, setArquivos] = useState([]);
    const [isFormVisivel, setIsFormVisivel] = useState(true);
    const [exibirLista, setExibirLista] = useState(false);
    const [carregando, setCarregando] = useState(false);

    const handleListarArquivos = async (parametros) => {
        NotificationManager.info("Essa operação pode demorar alguns segundos, aguarde enquanto obtemos os dados.")

        setCarregando(true);
        setExibirLista(true);
        const response = await listContents(parametros);

        if (!response.error) {
            console.log(response.data);
            setArquivos(response.data);
        }
        setCarregando(false)
    };

    return (
        <React.Fragment>
            <Titulo 
                titulo='Arquivos'
                paragrafo='Arquivos > Gerenciar arquivos'
            />

            <div className="button-menu">  
                <Button 
                    type="primary"
                    icon={<FaSearch />}
                    onClick={() => setIsFormVisivel(!isFormVisivel)}
                >
                    Filtrar
                </Button>
            </div>

            { isFormVisivel && (
                <div className="global-div" style={{width: "50%"}}> 
                    <FormListarArquivos onSearch={handleListarArquivos}/>
                </div>
            )}

            { exibirLista && (
                <div className="global-div">
                    <ListaArquivos dadosArquivos={arquivos} carregando={carregando}/>
                </div>)
            } 

        </React.Fragment> 
    )
}

export default GerenciarArquivosGithub;
