import React, { useState, useEffect } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import { Button, Spin } from "antd";
import { FaGithub, FaSearch } from "react-icons/fa";
import FormListarArquivos from "../../components/FormListarArquivos/FormListarArquivos";
import { listContents } from "../../../../services/githubIntegration";
import ListaArquivos from "../../components/ListaArquivos/ListaArquivos";
import { NotificationManager } from "react-notifications";
import { useContextoArtefato } from "../../context/ContextoArtefato";
import { FaArrowsRotate } from "react-icons/fa6";
import { sicronizarArtefatos, verificarExistenciaArquivo } from "../../../../services/artefatoService";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";

const GerenciarArquivosGithub = () => {

    const [arquivos, setArquivos] = useState([]);
    const [isFormVisivel, setIsFormVisivel] = useState(true);
    const [exibirLista, setExibirLista] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const {dadosProjeto} = useContextoArtefato()

    const handleListarArquivosGithub = async (parametros) => {
        NotificationManager.info("Essa operação pode demorar alguns segundos, aguarde enquanto obtemos os dados.")

        setCarregando(true);
        setExibirLista(true);
        const response = await listContents(parametros);

        if (!response.error) {
            await handleVerificarExistenciaArquivoBD(response.data)
        }
        setCarregando(false)
    };

    const handleVerificarExistenciaArquivoBD = async (dadosArquivos) => {

        try {
            const dados = await Promise.all(dadosArquivos.map(async (arquivo) => {
                const resArtefato = await verificarExistenciaArquivo(arquivo.sha)
    
                if (!resArtefato.error) {
                    const existe = resArtefato.data.existe
                    return { ...arquivo, existe }
                }
                return arquivo
            }))

            setArquivos(dados)

        } catch (error) {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
        }
    }

    const handleSicronizar = async () => {
        const arquivosSicronizar = arquivos.filter(arquivo => !arquivo.existe);

        const dadosEnviar = arquivosSicronizar.map((item) => {
            
            return {
                nome: item.name,
                status: 'criado',
                descricao: null,
                id_file: item.sha,
                path_file: item.path,
                projeto: dadosProjeto.id,
                iteracao: null
            }
        })

        await sicronizarArtefatos(dadosEnviar)
    }

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
                    <FormListarArquivos onSearch={handleListarArquivosGithub}/>
                </div>
            )}

            { exibirLista &&
                <React.Fragment>
                    <div className="global-div" > 
                        <div 
                            style={{
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'baseline',
                            }}
                        > 
                            <h3> {dadosProjeto.nome} </h3>
                            <Button onClick={handleSicronizar} type="primary" icon={<FaArrowsRotate/>}> Sicronizar </Button>

                        </div>
                    </div>

                    <div className="global-div">
                        <ListaArquivos dadosArquivos={arquivos} carregando={carregando}/>
                    </div>)
                </React.Fragment>
            } 

        </React.Fragment> 
    )
}

export default GerenciarArquivosGithub;
