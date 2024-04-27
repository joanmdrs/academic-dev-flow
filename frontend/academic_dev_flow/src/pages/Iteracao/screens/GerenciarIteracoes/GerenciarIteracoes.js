import React, { useState } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import { Button } from "antd";
import { FaPlus, FaSearch } from "react-icons/fa";
import FormGenericBusca from "../../../../components/Forms/FormGenericBusca/FormGenericBusca";

const GerenciarIteracoes = () => {

    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false)


    return (

        <React.Fragment>
            <Titulo
                titulo="Iterações"
                paragrafo="Iterações > Gerenciar iterações"
            />

            <div className="button-menu"> 
                <Button
                    icon={<FaSearch />} 
                    type="primary"
                    onClick={() => setIsFormBuscarVisivel(true)}
                >
                    Buscar
                </Button>
                <Button 
                    icon={<FaPlus />} 
                    type="primary" 
                >
                    Criar Iteração
                </Button>
            </div>

            {isFormBuscarVisivel && (
                <div className="global-div" style={{width: '50%'}}>   
                    <FormGenericBusca />
                </div>
            )}
        </React.Fragment>
    )
}

export default GerenciarIteracoes