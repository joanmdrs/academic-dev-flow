import { Button, Space } from "antd";
import React, { useEffect, useState } from "react";
import TableProjetoEquipe from "../../components/TableProjetoEquipe/TableProjetoEquipe";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import { handleError } from "../../../../services/utils";
import { buscarProjetosDoMembro } from "../../../../services/membroProjetoService";
import { useNavigate } from "react-router-dom";
import ListProjetoEquipe from "../../components/ListProjetoEquipe/ListProjetoEquipe";

const QuadroMembros = () => {

    const {usuario, grupo} = useContextoGlobalUser()
    const [projetosEquipes, setProjetosEquipes] = useState([])
    const navigate = useNavigate();

    const handleBuscarProjetosDoMembro = async () => {
        const response = await buscarProjetosDoMembro(usuario.id)

        if(!response.error){
            setProjetosEquipes(response.data)
        }
    }

    const handleVisualizarEquipe = async (record) => {
        const parametros = {
            idProjeto: record.projeto
        }
        if (grupo === 'Docentes') {
            navigate("/professor/membros/equipe", {
                state: parametros
            });
        } else if (grupo === 'Discentes') {
            navigate("/aluno/membros/equipe", {
                state: parametros
            });
        } else if (grupo === 'Administradores') {
            navigate("/admin/membros/equipe", {
                state: parametros
            });
        }
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                if (usuario && usuario.id){
                    await handleBuscarProjetosDoMembro()
                }
            } catch (error) {
                return handleError(error, 'Falha ao buscar os dados !')
            }
        }
        fetchData()
    }, [usuario])

    return (
        <div className="content"> 
            <div style={{
                borderBottom: '1px solid #ddd',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '20px',
                backgroundColor: '#FFFFFF'
            }}> 
               <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <h2 style={{margin: 0, fontFamily: 'Poppins, sans-serif', fontWeight: '600'}}> Membros </h2>
                    <h4 
                        style={{margin: 0, fontFamily: 'Poppins, sans-serif', fontWeight: '400'}}> 
                        Encontre suas equipes 
                    </h4>
                </div>

            </div>

            <div>

                <div style={{padding: '20px'}}> 
                    <TableProjetoEquipe data={projetosEquipes} onOpen={handleVisualizarEquipe} />
                </div>
            </div>

        </div>
    )
    
}

export default QuadroMembros