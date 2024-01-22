import React from "react";
import { Button } from "antd";
import {MdAdd} from 'react-icons/md';

const BotaoNovoFluxo = ({funcao}) => {

    return (

        <div>
            <Button 
                onClick={funcao} 
                type="primary" 
                style={{
                    marginTop: "20px",
                    padding: "30px",
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