import React, { useEffect, useState } from "react";
import { atualizarComentarioTarefa, criarComentarioTarefa, excluirComentarioTarefa, listarComentariosPorTarefa } from "../../../../services/comentarioService";
import { Drawer, Modal } from "antd";
import { buscarMembroProjetoPeloIdMembroEPeloIdProjeto } from "../../../../services/membroProjetoService";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import ListComentarios from "../../../Comentario/components/ListaComentarios/ListComentarios";
import FormComentario from "../../../Comentario/components/FormComentario/FormComentario";
import { useContextoTarefa } from "../../context/ContextoTarefa";

const DrawerComments = ({isDrawerVisible, closeDrawer}) => {

    const { usuario } = useContextoGlobalUser();
    const [comentarios, setComentarios] = useState([]);
    const { dadosTarefa } = useContextoTarefa();

    const [autor, setAutor] = useState(null);

    const handleGetComentarios = async () => {
        const response = await listarComentariosPorTarefa(dadosTarefa.id);
        if (!response.error) {
            setComentarios(response.data);
        }
    };

    const handleGetMembroProjeto = async () => {
        const response = await buscarMembroProjetoPeloIdMembroEPeloIdProjeto(dadosTarefa.projeto, usuario.id);
        if (!response.error) {
            setAutor(response.data);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (dadosTarefa) {
                await handleGetComentarios();
                await handleGetMembroProjeto();
            }
        };
        fetchData();
    }, [dadosTarefa]);

    const handleCriarComentario = async (dadosForm) => {
        const dadosEnviar = {
            mensagem: dadosForm.mensagem,
            autor: autor.id,
            tarefa: dadosTarefa.id,
        };
        const response = await criarComentarioTarefa(dadosEnviar);
        if (!response.error){
            await handleGetComentarios()
        }
    };

    const handleAtualizarComentario = async (idComentario, mensagem) => {
        const dadosEnviar = {
            mensagem: mensagem,
            autor: autor.id,
            tarefa: dadosTarefa.id,
        };

        const response = await atualizarComentarioTarefa(idComentario, dadosEnviar);

        if (!response.error){
            await handleGetComentarios();
        }
    };

    const handleExcluirComentario = async (id) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir este item?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                await excluirComentarioTarefa(id);
                await handleGetComentarios();
            }
        });
    };

    return (
        <Drawer
            title={`Comentários - ${dadosTarefa?.nome} - ${dadosTarefa?.nome_projeto}`}
            width={800}  // Define uma largura máxima para o Drawer
            onClose={closeDrawer}
            open={isDrawerVisible}
            placement="right"
            maskClosable={false}
        >
            <div style={{marginBottom: '20px'}}> 
                {comentarios.length > 0 ? (
                    <ListComentarios userId={autor?.id} data={comentarios} onUpdate={handleAtualizarComentario} onDelete={handleExcluirComentario} />
                ) : (
                    <div>Nenhum comentário para exibir</div>
                )}
                </div>
            <div 
                style={{ 
                    padding: "10px 20px", 
                    position: "sticky", 
                    bottom: 0, 
                    background: "#fff", 
                    borderTop: '1px solid #ddd'
                }}>
                <FormComentario 
                    onSubmit={handleCriarComentario} 
                    titulo="Cadastrar Comentário" 
                />
            </div>
        </Drawer>
    );
};

export default DrawerComments;
