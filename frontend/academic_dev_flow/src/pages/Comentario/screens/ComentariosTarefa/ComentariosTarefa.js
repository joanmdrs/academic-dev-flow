import React, { useEffect, useState } from "react";
import FormComentario from "../../components/FormComentario/FormComentario";
import { atualizarComentarioTarefa, criarComentarioTarefa, excluirComentarioTarefa, listarComentariosPorTarefa } from "../../../../services/comentarioService";
import ListaComentarios from "../../components/ListaComentarios/ListaComentarios";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { useContextoComentario } from "../../context/ContextoComentario";
import { Modal } from "antd";
import { buscarMembroProjetoPeloIdMembro, buscarMembroProjetoPeloUsuarioGithub } from "../../../../services/membroProjetoService";

const ComentariosTarefa = ({idTarefa}) => {

    const [comentarios, setComentarios] = useState([])
    const {dadosProjeto, autor} = useContextoGlobalProjeto()
    const {
        comentarioPai,
        setComentarioEditado,
        setEditorVisivel
    } = useContextoComentario()
    const [membroProjeto, setMembroProjeto] = useState(null)

    const handleGetComentarios = async () => {
        const response = await listarComentariosPorTarefa(idTarefa)
        if (!response.error){
            setComentarios(response.data)
        }
    }

    const handleGetMembroProjeto = async () => {

        const parametros = {
            id_membro: autor.id_membro,
            id_projeto: dadosProjeto.id
        }
        const response = await buscarMembroProjetoPeloIdMembro(parametros)
        if (!response.error){
            setMembroProjeto(response.data)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (idTarefa && dadosProjeto) {
                await handleGetComentarios()
                await handleGetMembroProjeto()
            }
        }

        fetchData()
    }, [])

    const handleCriarComentario = async (dadosForm) => {
        const dadosEnviar = {
            texto: dadosForm.texto,
            autor: membroProjeto.id,
            tarefa: idTarefa,
            comentario_pai: comentarioPai
        }

        await criarComentarioTarefa(dadosEnviar)
        await handleGetComentarios()
    }

    const handleAtualizarComentario = async (id, texto) => {
        const dadosEnviar = {
            texto: texto,
            autor: membroProjeto.id,
            tarefa: idTarefa,
            comentario_pai: comentarioPai
        }

        await atualizarComentarioTarefa(id, dadosEnviar)
        setComentarioEditado(null);
        setEditorVisivel(false);
        await handleGetComentarios()
    }

    const handleExcluirComentario = async (id) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir este item ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                await excluirComentarioTarefa(id)
                await handleGetComentarios()
            }
        });
    }

    return (
        <React.Fragment>

            {comentarios.length > 0 && (
                <ListaComentarios 
                    comentarios={comentarios} 
                    onUpdate={handleAtualizarComentario} 
                    onDelete={handleExcluirComentario} 
                />
            )}

            <div className="global-div" style={{width: '50%'}}> 
                <FormComentario titulo="CADASTRAR COMENTÁRIO" onSubmit={handleCriarComentario} />
            </div>

        </React.Fragment>
    )
}

export default ComentariosTarefa