import { Flex } from "antd";
import React from "react";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import { useProjetoContext } from "../../../context/ProjetoContext";
import { excluirIteracao } from "../../../services/iteracaoService";


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

    const {setDadosIteracao} = useProjetoContext()

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
                props.iteracoes &&  
                                    
                (<Flex horizontal>
                    {props.iteracoes.map((iteracao) => (
                        <div
                            
                            key={iteracao.id}
                            style={{
                            ...colunaStyle,
                            backgroundColor: iteracao.numero % 2 ? '#1677ff' : '#1677ffbf',
                            }}

                        >
                            <div style={{display: 'flex', flexDirection: 'column', width: "100%"}}>
                                <CustomDropdown iteracao={iteracao} handleEdit={handleEdit} handleDelete={handleDelete}/>


                                <div style={{...iteracaoStyle}}>
                                    {iteracao.nome}
                                </div>

                                {/* <div style={{display: "flex", alignItems: "center", flexDirection: "column", marginTop: "20px"}}>

                                    { props.tarefas ? 
                                        <div >
                                            {props.tarefas.map((item) => {
                                                if (item.idIteracao === iteracao.id) {
                                                    return (
                                                        <div key={item.id} style={{display: "flex", alignItems: "center", flexDirection: "column", gap: "10px"}}>
                                                            {item.tarefas.map((task) => {
                                                                return (
                                                                    <div 
                                                                        style={{
                                                                            border: "1px solid #d9d9d9",
                                                                            padding: "20px",
                                                                            width: "100%",
                                                                            borderRadius: "20px"
                                                                        }} 
                                                                        key={task.id}> {task.nome} 
                                                                    </div>
                                                                )
                                                                
                                                            })}
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </div>
                                        

                                        : null

                                    }
                                    
                                </div> */}
                            </div>
                            
                        </div>
                    ))}
                </Flex>)

            }
        </div>
    )
}

export default Cronograma