import React from "react";
import { Button } from "antd";
import {MdAdd} from 'react-icons/md';
import { useFormContext } from "../../context/Provider/FormProvider";

const BotaoNovoFluxo = ({funcaoMostrarForm}) => {

    const {setAcaoFormFluxo} = useFormContext()
    
    const handleCliqueBotaoNovoFluxo = () => {
        funcaoMostrarForm()
        setAcaoFormFluxo('criar')

    }

    return (

        <div>
            <Button 
                onClick={handleCliqueBotaoNovoFluxo} 
                type="primary" 
                style={{
                    marginTop: "20px",
                    padding: "25px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "30px"
                }}>
                <MdAdd size="20px" />
                Novo Fluxo
            </Button>
         
        </div>
    )
}

export default BotaoNovoFluxo;