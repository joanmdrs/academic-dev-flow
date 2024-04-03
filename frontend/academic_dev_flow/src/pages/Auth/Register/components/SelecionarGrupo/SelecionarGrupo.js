import React, { useState } from "react";
import "./SelecionarGrupo.css"
import { Button } from "antd";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useRegisterContexto } from "../../context/RegisterContexto";


const SelecionarGrupo = () => {

    const [itemSelecionado, setItemSelecionado] = useState(null);
    const {setGrupoUsuario, setStep} = useRegisterContexto()

    const handleSelecionarGrupo = (id) => { 

        if (id === itemSelecionado) {
            setItemSelecionado(null)
        } else {
            setItemSelecionado(id);
        }
    };

    const handleProsseguir = () => {
        setGrupoUsuario(itemSelecionado)
        setStep("2")
    }

    return (
        <div className="screen-selecionar-grupo">

            <div>
                <h2> Qual o seu perfil de usuário ? </h2>
            </div>

            <div className="grupos">
                <div 
                    id="Docentes" 
                    onClick={() => handleSelecionarGrupo("Docentes")} 
                    className={`item-grupo ${itemSelecionado === "Docentes" ? "item-selecionado" : ""}`}> 
                    Professor 
                </div>
                <div 
                    id="Discentes" 
                    onClick={() => handleSelecionarGrupo("Discentes")} 
                    className={`item-grupo ${itemSelecionado === "Discentes" ? "item-selecionado" : ""}`}> 
                    Estudante 
                </div>
                <div 
                    id="Colaboradores" 
                    onClick={() => handleSelecionarGrupo("Colaboradores")} 
                    className={`item-grupo ${itemSelecionado === "Colaboradores" ? "item-selecionado" : ""}`}> 
                    Colaborador 
                </div>
            </div>

            {itemSelecionado && (
                <div>
                <Button type="primary" onClick={handleProsseguir}>
                    Prosseguir <IoIosArrowRoundForward />
                </Button>
                </div>
            )}
        </div>
    )
}

export default SelecionarGrupo