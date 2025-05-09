import React, { useState, useEffect } from "react";
import "./SelecionarGrupo.css";
import { Button } from "antd";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useRegisterContexto } from "../../context/RegisterContexto";
import assetTeacher from "../../../../../assets/user-teacher.png";
import assetStudent from "../../../../../assets/user-student.png";
import assetColaborator from "../../../../../assets/user-colaborator.png";
import { listarGrupos } from "../../../../../services/membroService";
import { MdOutlineArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SelecionarGrupo = () => {
    const [itemSelecionado, setItemSelecionado] = useState(null); // Armazena o grupo selecionado pelo usuário
    const [opcoesGrupos, setOpcoesGrupos] = useState([]); // Armazena os grupos carregados da API
    const { grupoUsuario, setGrupoUsuario, setStep } = useRegisterContexto();
    const navigate = useNavigate()


    useEffect(() => {
        const carregarGrupos = async () => {
            try {
                const response = await listarGrupos();

                if (grupoUsuario){
                    setItemSelecionado(grupoUsuario)
                }

                if (!response.error) {
                    const grupos = response.data.map(item => ({
                        value: item.id, // ID do grupo
                        label: item.name, // Nome do grupo
                    }));
                    setOpcoesGrupos(grupos); // Atualiza as opções de grupos
                }
            } catch (error) {
                console.error("Erro ao buscar grupos:", error);
            }
        };

        carregarGrupos();
    }, []);

    // Trata a seleção de um grupo
    const handleSelecionarGrupo = (nomeGrupo) => {
        const grupoSelecionado = opcoesGrupos.find(grupo => grupo.label === nomeGrupo);
        if (grupoSelecionado) {
            setItemSelecionado(grupoSelecionado.value); // Define o ID do grupo selecionado
        } else {
            setItemSelecionado(null); // Desmarca a seleção
        }
    };

    // Define o grupo selecionado e avança para o próximo passo
    const handleProsseguir = () => {
        setGrupoUsuario(itemSelecionado); // Envia o ID do grupo selecionado
        setStep("2");
    };

    return (
        <div className="screen-selecionar-grupo">
            <div>
                <h2>Qual o seu perfil de usuário?</h2>
            </div>

            <div className="grupos">
                <div
                    id="Docentes"
                    onClick={() => handleSelecionarGrupo("Docentes")}
                    className={`item-grupo ${itemSelecionado === opcoesGrupos.find(g => g.label === "Docentes")?.value ? "item-selecionado" : ""}`}
                >
                    <img src={assetTeacher} alt="icone-professor" />
                    Docente
                </div>
                <div
                    id="Discentes"
                    onClick={() => handleSelecionarGrupo("Discentes")}
                    className={`item-grupo ${itemSelecionado === opcoesGrupos.find(g => g.label === "Discentes")?.value ? "item-selecionado" : ""}`}
                >
                    <img src={assetStudent} alt="icone-estudante" />
                    Discente
                </div>
                <div
                    id="Colaboradores"
                    onClick={() => handleSelecionarGrupo("Colaboradores")}
                    className={`item-grupo ${itemSelecionado === opcoesGrupos.find(g => g.label === "Colaboradores")?.value ? "item-selecionado" : ""}`}
                >
                    <img src={assetColaborator} alt="icone-colaborador" />
                    Colaborador
                </div>
            </div>

            <div style={{display: 'flex', gap: '10px'}}> 
                <Button 
                    onClick={() => navigate(-1)} 
                    icon={<MdOutlineArrowBackIosNew/>}
                >
                    Voltar 
                </Button>
                {itemSelecionado && (
                    <Button type="primary" onClick={handleProsseguir}>
                        Prosseguir <MdOutlineArrowForwardIos />
                    </Button>
                )}
            </div>

           
        </div>
    );
};

export default SelecionarGrupo;
