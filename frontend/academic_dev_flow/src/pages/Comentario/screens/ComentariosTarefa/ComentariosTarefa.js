import React, { useEffect, useState } from "react";
import FormComentario from "../../components/FormComentario/FormComentario";
import { atualizarComentarioTarefa, criarComentarioTarefa, excluirComentarioTarefa, listarComentariosPorTarefa } from "../../../../services/comentarioService";
import ListaComentarios from "../../components/ListaComentarios/ListaComentarios";
import { useContextoComentario } from "../../context/ContextoComentario";
import { Modal } from "antd";
import { useContextoTarefa } from "../../../Tarefa/context/ContextoTarefa";
import { buscarMembroProjetoPeloIdMembroEPeloIdProjeto } from "../../../../services/membroProjetoService";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";

const ComentariosTarefa = () => {

    const [ comentarios, setComentarios] = useState([])
    const {dadosTarefa} = useContextoTarefa()
    const {autor, dadosProjeto} = useContextoGlobalProjeto()
    const {
        comentarioPai,
        setComentarioEditado,
        setEditorVisivel
    } = useContextoComentario()

    const [membroProjeto, setMembroProjeto] = useState(null)

    const handleGetComentarios = async () => {
        const response = await listarComentariosPorTarefa(dadosTarefa.id)
        if (!response.error){
            setComentarios(response.data)
        }
    }

    const handleGetMembroProjeto = async () => {

        const response = await buscarMembroProjetoPeloIdMembroEPeloIdProjeto(dadosProjeto.id, autor.id_membro)
        if (!response.error){
            setMembroProjeto(response.data)
        }
        console.log(membroProjeto)
    }

    useEffect(() => {
        const fetchData = async () => {
            await handleGetComentarios()
            await handleGetMembroProjeto()
            
        }

        fetchData()
    }, [])

    const handleCriarComentario = async (dadosForm) => {
        const dadosEnviar = {
            texto: dadosForm.texto,
            autor: membroProjeto.id,
            tarefa: dadosTarefa.id,
            comentario_pai: comentarioPai
        }

        await criarComentarioTarefa(dadosEnviar)
        await handleGetComentarios()
    }

    const handleAtualizarComentario = async (id, texto) => {
        const dadosEnviar = {
            texto: texto,
            autor: membroProjeto.id,
            tarefa: dadosTarefa.id,
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

            <div style={{height: '2px', width: '100%', backgroundColor: '#F0F0F0', marginTop: '20px'}}> 

            </div>

            <div style={{width: '50%'}}> 
                <FormComentario titulo="Adicione um comentário" onSubmit={handleCriarComentario} />
            </div>

        </React.Fragment>
    )
}

export default ComentariosTarefa

