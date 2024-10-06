import React, { useState } from "react";
import { Button } from "antd";
import { NotificationManager } from "react-notifications";
import { FaArrowRotateRight, FaArrowsRotate, FaFilter } from "react-icons/fa6";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { deleteContent, listContents } from "../../../../services/githubIntegration";
import { excluirArtefato, sicronizarContents, verificarExistenciaArquivo } from "../../../../services/artefatoService";
import { handleError } from "../../../../services/utils";
import Titulo from "../../../../components/Titulo/Titulo";
import FormFilterContents from "../../components/FormFilterContents/FormFilterContents";
import SelectProject from "../../components/SelectProject/SelectProject";
import TableContents from "../../components/TableContents/TableContents";

const AdminContents = () => {

    const [contents, setContents] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(true);
    const [isModalToDeleteVisible, setIsModalToDeleteVisible] = useState(false)
    const [isTableVisible, setIsTableVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()
    const [contentToDelete, setContentToDelete] = useState(null)
    const [folder, setFolder] = useState(null)

    const handleExibirModal = () => setIsModalToDeleteVisible(true)
    const handleFecharModal = () => setIsModalToDeleteVisible(false)

    const handleResetar = async () => {
        setIsTableVisible(false)
        setIsFormVisible(false)
        setContents([])
        setIsModalToDeleteVisible(false)
        setLoading(false)
        setDadosProjeto(null)
        setContentToDelete(null)
    }

    const handleGetContents = async (parametros) => {
        setContents([])
        setLoading(true);
        setIsTableVisible(true);
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
            setContentToDelete(parametros)
        } else {
            NotificationManager.error('Ocorreu um erro ao buscar os dados, contate o suporte!')
        }
    }

    const handleExcluirArquivo = async (parametro) => {
        const objeto = contentToDelete
        objeto['commit_message'] = parametro
        const resArtefato = await excluirArtefato(objeto.id_artefato)

        if (resArtefato.status && resArtefato.status === 204){

            await deleteContent(objeto)
        }
    }

    return (
        <React.Fragment>
            <Titulo 
                titulo='Gerenciar Contents'
                paragrafo='GitHub > Contents > Gerenciar Contents'
            />

            <div style={{display:'flex', justifyContent: 'space-between', gap: '10px', margin: '20px'}}> 

                <div style={{display: 'flex', gap: '10px'}}> 
                    <Button
                        icon={<FaFilter />} 
                        type="primary"
                        onClick={() => setIsFormVisible(!isFormVisible)}
                       
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

            { isFormVisible && (
                <div className="global-div" style={{width: "50%"}}> 
                    <FormFilterContents inputSelectProject={<SelectProject />} onSearch={handleGetContents} />
                </div>
            )}

            { isTableVisible &&
                    
                <div className="global-div">
                    <TableContents 
                        contentsData={contents} 
                        onLoading={loading} 
                        onDelete={handlePrepararExcluirArquivo}
                        
                    />
                </div>
            }

        </React.Fragment> 
    )
}

export default AdminContents;
