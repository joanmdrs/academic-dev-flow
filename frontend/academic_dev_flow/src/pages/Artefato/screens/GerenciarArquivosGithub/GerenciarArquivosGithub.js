import React, { useState, useEffect } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import { Button, Modal, Spin } from "antd";
import { FaGithub, FaSearch } from "react-icons/fa";
import FormListarArquivos from "../../components/FormListarArquivos/FormListarArquivos";
import { deleteContent, listContents } from "../../../../services/githubIntegration";
import ListaArquivos from "../../components/ListaArquivos/ListaArquivos";
import { NotificationManager } from "react-notifications";
import { useContextoArtefato } from "../../context/ContextoArtefato";
import { FaArrowsRotate } from "react-icons/fa6";
import { excluirArtefato, sicronizarContents, verificarExistenciaArquivo } from "../../../../services/artefatoService";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import ModalExcluirArtefato from "../../components/ModalExcluirArtefato/ModalExcluirArtefato";

const GerenciarArquivosGithub = () => {

    const [arquivos, setArquivos] = useState([]);
    const [isFormVisivel, setIsFormVisivel] = useState(true);
    const [isModalExcluirVisivel, setIsModalExcluirVisivel] = useState(false)
    const [exibirLista, setExibirLista] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const {dadosProjeto} = useContextoArtefato();
    const [arquivoExcluir, setArquivoExcluir] = useState({})

    const handleExibirModal = () => setIsModalExcluirVisivel(true)
    const handleFecharModal = () => setIsModalExcluirVisivel(false)

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
                    const existe = resArtefato.data
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

        await sicronizarContents(dadosEnviar)
    }

    const handleConfirmarExclusao = (record) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Tem certeza que deseja excluir este item ? Esta ação é irreversível !',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: () =>  handlePrepararExcluirArquivo(record)
        });
    }

    const handlePrepararExcluirArquivo = async (record) => {
        const resArtefato = await verificarExistenciaArquivo(record.sha)

        if (!resArtefato.error){
            handleExibirModal()
            const parametros = {
                id_artefato: resArtefato.data.id,
                github_token: dadosProjeto.token,
                repository: dadosProjeto.nome_repo,
                path: record.path
            }
            setArquivoExcluir(parametros)
        } else {
            NotificationManager.error('Ocorreu um erro ao buscar os dados, contate o suporte!')
        }
    }

    const handleExcluirArquivo = async (parametro) => {
        const objeto = arquivoExcluir
        objeto['commit_message'] = parametro
        const resArtefato = await excluirArtefato(objeto.id_artefato)

        if (resArtefato.status && resArtefato.status === 204){

            await deleteContent(objeto)
        }
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
                        <ListaArquivos 
                            dadosArquivos={arquivos} 
                            carregando={carregando} 
                            onDelete={handleConfirmarExclusao}
                            
                        />
                    </div>
                </React.Fragment>
            } 
            <ModalExcluirArtefato 
                visible={isModalExcluirVisivel}
                onCancel={handleFecharModal}
                onDelete={handleExcluirArquivo}
            />

        </React.Fragment> 
    )
}

export default GerenciarArquivosGithub;
