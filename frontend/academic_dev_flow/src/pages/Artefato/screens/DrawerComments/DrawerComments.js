import React, { useEffect, useState } from "react";
import { atualizarComentarioArtefato, criarComentarioArtefato, excluirComentarioArtefato, listarComentariosPorArtefato } from "../../../../services/comentarioService";
import { Drawer, Modal } from "antd";
import { buscarMembroProjetoPeloIdMembroEPeloIdProjeto } from "../../../../services/membroProjetoService";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import ListComentarios from "../../../Comentario/components/ListaComentarios/ListComentarios";
import FormComentario from "../../../Comentario/components/FormComentario/FormComentario";
import { useContextoArtefato } from "../../context/ContextoArtefato";

const DrawerComments = ({isDrawerVisible, closeDrawer}) => {

    const { usuario } = useContextoGlobalUser();
    const [comentarios, setComentarios] = useState([]);
    const { dadosArtefato } = useContextoArtefato()

    const [autor, setAutor] = useState(null);

    const handleGetComentarios = async () => {
        const response = await listarComentariosPorArtefato(dadosArtefato.id);
        if (!response.error) {
            setComentarios(response.data);
        }
    };

    const handleGetMembroProjeto = async () => {
        const response = await buscarMembroProjetoPeloIdMembroEPeloIdProjeto(dadosArtefato.projeto, usuario.id);
        if (!response.error) {
            setAutor(response.data);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (dadosArtefato) {
                await handleGetComentarios();
                await handleGetMembroProjeto();
            }
        };
        fetchData();
    }, [dadosArtefato]);

    const handleCriarComentario = async (dadosForm) => {
        const dadosEnviar = {
            mensagem: dadosForm.mensagem,
            autor: autor.id,
            artefato: dadosArtefato.id,
        };
        const response = await criarComentarioArtefato(dadosEnviar)
        if (!response.error){
            await handleGetComentarios()
        }
    };

    const handleAtualizarComentario = async (idComentario, mensagem) => {
        const dadosEnviar = {
            mensagem: mensagem,
            autor: autor.id,
            artefato: dadosArtefato.id,
        };

        const response = await atualizarComentarioArtefato(idComentario, dadosEnviar);

        if (!response.error){
            await handleGetComentarios();
        }
    };

    const handleExcluirComentario = async (id) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir este comentário ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                await excluirComentarioArtefato(id);
                await handleGetComentarios();
            }
        });
    };

    return (
        <Drawer
            title={`Comentários - ${dadosArtefato?.nome} - ${dadosArtefato?.nome_projeto}`}
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
