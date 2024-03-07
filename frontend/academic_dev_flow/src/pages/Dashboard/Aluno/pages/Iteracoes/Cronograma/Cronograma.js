import { Flex } from "antd";
import React from "react";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import { useFormContext } from "../../../context/Provider/Provider";
import { excluirIteracao } from "../../../../../../services/iteracaoService";

const cronogramaStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%"
}

const colunaStyle = {
    padding: "0",
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    width: '25%',
    height: '100vh',
}

const iteracaoStyle = {
    flex: "1",
    textAlign: "center",
    textTransform: "uppercase",
    color: "#fff"
}

const Cronograma = (props) => {

    const {setDadosIteracao} = useFormContext()

    const handleEdit = (record) => {
        props.exibirForm()
        setDadosIteracao(record)
    }

    const handleDelete = async (record) => {
        await excluirIteracao(record.id)
    }

    return (
        <div style={{...cronogramaStyle}}>
                
            <h4 style={{textAlign: "center"}}> Cronograma de Iterações </h4> 
            {
                props.dados &&  
                                    
                (<Flex horizontal>
                    {props.dados.map((iteracao) => (
                        <div
                            
                            key={iteracao.id}
                            style={{
                            ...colunaStyle,
                            backgroundColor: iteracao.id % 2 ? '#1677ff' : '#1677ffbf',
                            }}

                        >
                            <div style={{display: 'flex', flexDirection: 'column-reverse', width: "100%"}}>
                                <div style={{...iteracaoStyle}}>
                                    {iteracao.nome}
                                </div>
                                
                                <CustomDropdown iteracao={iteracao} handleEdit={handleEdit} handleDelete={handleDelete}/>
                            </div>
                            
                        </div>
                    ))}
                </Flex>)

            }
        </div>
    )
}

export default Cronograma