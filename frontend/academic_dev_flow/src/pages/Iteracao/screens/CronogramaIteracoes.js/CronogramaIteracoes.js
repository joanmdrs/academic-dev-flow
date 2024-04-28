import React from "react";
import { useContextoIteracao } from "../../context/contextoIteracao";
import { Button } from "antd";
import { FaTrash } from "react-icons/fa";

const CronogramaIteracoes = () => {

    const {
        iteracoes,
        setDadosIteracao, 
        iteracoesSelecionadas, 
        setIteracoesSelecionadas} = useContextoIteracao()


    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
          setIteracoesSelecionadas(selectedRows)
        },
    };



    return (
        <div>

            <h4 style={{textAlign: "center"}}> Cronograma de Iterações </h4> 
        
            <React.Fragment>
                
                <div style={{display: "flex", justifyContent: "flex-end", marginRight: "20px"}}>  
                    {
                        (iteracoesSelecionadas.length > 0) && <Button danger icon={<FaTrash />}> Excluir </Button>
                    }
                </div>

                

 
                                        

            </React.Fragment>
            
        </div>
    )
}

export default CronogramaIteracoes