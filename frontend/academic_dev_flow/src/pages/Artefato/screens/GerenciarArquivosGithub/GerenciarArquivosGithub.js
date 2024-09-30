import React, { useState } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import { Button } from "antd";
import FormListarArquivos from "../../components/FormListarArquivos/FormListarArquivos";
import { deleteContent, listContents } from "../../../../services/githubIntegration";
import ListaArquivos from "../../components/ListaArquivos/ListaArquivos";
import { NotificationManager } from "react-notifications";
import { excluirArtefato, sicronizarContents, verificarExistenciaArquivo } from "../../../../services/artefatoService";
import { handleError } from "../../../../services/utils";
import ModalExcluirArtefato from "../../components/ModalExcluirArtefato/ModalExcluirArtefato";
import { FaArrowRotateRight, FaArrowsRotate, FaFilter } from "react-icons/fa6";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";

const GerenciarArquivosGithub = () => {

    const [contents, setContents] = useState([]);
    const [isFormVisivel, setIsFormVisivel] = useState(true);
    const [isModalExcluirVisivel, setIsModalExcluirVisivel] = useState(false)
    const [isTableVisivel, setIsTableVisivel] = useState(false);
    const [loading, setLoading] = useState(false);
    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()
    const [arquivoExcluir, setArquivoExcluir] = useState(null)
    const [folder, setFolder] = useState(null)

    const handleExibirModal = () => setIsModalExcluirVisivel(true)
    const handleFecharModal = () => setIsModalExcluirVisivel(false)

    const handleResetar = async () => {
        setIsTableVisivel(false)
        setIsFormVisivel(false)
        setContents([])
        setIsModalExcluirVisivel(false)
        setLoading(false)
        setDadosProjeto(null)
        setArquivoExcluir(null)
    }

    const handleGetContents = async (parametros) => {
        setContents([])
        setLoading(true);
        setIsTableVisivel(true);
        setFolder(parametros.folder)

        const response = await listContents(parametros)

        if (!response.error && response.data){
            setContents(response.data)
        } else {
            setContents([])
        } 
        setLoading(false)
    };

    const handleScriconizarContents = async () => {
        try {
            const novosContents = contents.filter(item => !item.exists);
    
            if (novosContents.length > 0) {
                const dados = novosContents.map(item => ({
                    nome: item.name,
                    id_file: item.sha,
                    path_file: item.path,
                    projeto: dadosProjeto.id
                }))
                await sicronizarContents(dados);

                const parametros = {
                    github_token: dadosProjeto.token,
                    repository: dadosProjeto.nome_repo,
                    folder: folder
                }
                setContents([])
                await handleGetContents(parametros)
            } else {
                NotificationManager.info('Todos os arquivos listados já estão salvos no banco de dados.');
            }
        } catch (error) {
            return handleError(error, "Falha ao tentar sicronizar os arquivos, contate o suporte!")
        }
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

            <div style={{display:'flex', justifyContent: 'space-between', gap: '10px', margin: '20px'}}> 

                <div style={{display: 'flex', gap: '10px'}}> 
                    <Button
                        icon={<FaFilter />} 
                        type="primary"
                        onClick={() => setIsFormVisivel(!isFormVisivel)}
                       
                    > 
                        Filtrar 
                    </Button>

                    <Button
                        icon={<FaArrowRotateRight />}
                        onClick={handleResetar}
                        danger
                        ghost
                    >
                        Resetar
                    </Button>
                </div>

                <div style={{display: 'flex', gap: '10px'}}> 
                    <Button 
                        icon={<FaArrowsRotate />} 
                        type="primary"  
                        ghost                 
                        disabled={contents.length === 0 ? true : false}
                        onClick={handleScriconizarContents}
                    > 
                        Sicronizar 
                    </Button>
                </div>
            </div>

            { isFormVisivel && (
                <div className="global-div" style={{width: "50%"}}> 
                    <FormListarArquivos onSearch={handleGetContents} />
                </div>
            )}

            { isTableVisivel &&
                    
                <div className="global-div">
                    <ListaArquivos 
                        dadosArquivos={contents} 
                        carregando={loading} 
                        onDelete={handlePrepararExcluirArquivo}
                        
                    />
                </div>
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
