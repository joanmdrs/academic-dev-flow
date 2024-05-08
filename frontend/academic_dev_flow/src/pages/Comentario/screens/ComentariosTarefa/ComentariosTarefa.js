import React, { useEffect, useState } from "react";
import FormComentario from "../../components/FormComentario/FormComentario";
import { atualizarComentarioTarefa, criarComentarioTarefa, excluirComentarioTarefa, listarComentariosPorTarefa } from "../../../../services/comentarioService";
import ListaComentarios from "../../components/ListaComentarios/ListaComentarios";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { useContextoComentario } from "../../context/ContextoComentario";
import { Modal } from "antd";

const ComentariosTarefa = ({idTarefa}) => {

    const [comentarios, setComentarios] = useState([])
    const {autor} = useContextoGlobalProjeto()
    const {
        comentarioPai,
        setComentarioEditado,
        setEditorVisivel
    } = useContextoComentario()

    const handleGetComentarios = async () => {
        const response = await listarComentariosPorTarefa(idTarefa)
        if (!response.error){
            setComentarios(response.data)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (idTarefa) {
                await handleGetComentarios()
            }
        }

        fetchData()
    }, [])

    const handleCriarComentario = async (dadosForm) => {
        const dadosEnviar = {
            texto: dadosForm.texto,
            autor: autor.id_membro_projeto,
            tarefa: idTarefa,
            comentario_pai: comentarioPai
        }

        await criarComentarioTarefa(dadosEnviar)
        await handleGetComentarios()
    }

    const handleAtualizarComentario = async (id, texto) => {
        const dadosEnviar = {
            texto: texto,
            autor: autor.id_membro_projeto,
            tarefa: idTarefa,
            comentario_pai: comentarioPai
        }

        console.log(dadosEnviar)
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