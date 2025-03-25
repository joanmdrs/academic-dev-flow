import { Breadcrumb, Button, Space } from "antd";
import React, { useEffect, useState } from "react";
import TableProjetoEquipe from "../../components/TableProjetoEquipe/TableProjetoEquipe";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import { handleError } from "../../../../services/utils";
import { buscarProjetosDoMembro } from "../../../../services/membroProjetoService";
import { useNavigate } from "react-router-dom";
import Section from "../../../../components/Section/Section";
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
import { HomeOutlined } from "@ant-design/icons";

const QuadroMembros = ({group}) => {

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
            navigate("/professor/membros/equipes/sua-equipe", {
                state: parametros
            });
        } else if (grupo === 'Discentes') {
            navigate("/aluno/membros/equipes/sua-equipe", {
                state: parametros
            });
        } else if (grupo === 'Administradores') {
            navigate("/admin/membros/equipes/sua-equipe", {
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
        <Section>

            <SectionHeader>
                <Breadcrumb
                    items={[
                        {
                            href: `/academicflow/${group}/home`,
                            title: <HomeOutlined />,
                        },
                        {
                            href: `/academicflow/${group}/membros/gerenciar`,
                            title: 'Membros',
                        },
                        {
                            href: `/academicflow/${group}/membros/equipes`,
                            title: 'Equipes',
                        }
                    ]}
                />
            </SectionHeader>

           

            <div>

                <div style={{padding: '20px'}}> 
                    <TableProjetoEquipe data={projetosEquipes} onOpen={handleVisualizarEquipe} />
                </div>
            </div>

        </Section>
    )
    
}

export default QuadroMembros