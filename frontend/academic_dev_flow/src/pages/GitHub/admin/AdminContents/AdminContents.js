import React, { useState } from "react";
import { Button } from "antd";
import { FaArrowRotateRight, FaFilter } from "react-icons/fa6";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { listContents } from "../../../../services/githubIntegration";
import Titulo from "../../../../components/Titulo/Titulo";
import FormFilterContents from "../../components/FormFilterContents/FormFilterContents";
import SelectProject from "../../components/SelectProject/SelectProject";
import TableContents from "../../components/TableContents/TableContents";

const AdminContents = () => {

    const [contents, setContents] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(true);
    const [isTableVisible, setIsTableVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const {setDadosProjeto} = useContextoGlobalProjeto()

    const handleResetar = async () => {
        setIsTableVisible(false)
        setIsFormVisible(false)
        setContents([])
        setLoading(false)
        setDadosProjeto(null)
    }

    const handleGetContents = async (dadosForm) => {
        setContents([])
        setLoading(true);
        setIsTableVisible(true);

        const response = await listContents(dadosForm)

        if (!response.error && response.data){
            setContents(response.data)
        } else {
            setContents([])
        } 
        setLoading(false)
    };

    return (
        <div className="content">
            <Titulo 
                titulo='Gerenciar Contents'
                paragrafo='GitHub > Contents > Gerenciar Contents'
            />

            <div style={{display:'flex', justifyContent: 'space-between', gap: '10px', margin: '20px'}}> 

                <div style={{display: 'flex', gap: '10px'}}> 
                    <Button
                        icon={<FaFilter />} 
                        type="primary"
                        onClick={() => setIsFormVisible(!isFormVisible)}
                    > 
                        Filtrar 
                    </Button>

                    <Button
                        icon={<FaArrowRotateRight />}
                        onClick={handleResetar}
                        type="primary"
                        ghost
                    >
                        Resetar
                    </Button>
                </div>
            </div>

            { isFormVisible && (
                <div style={{width: "50%"}}> 
                    <FormFilterContents inputSelectProject={<SelectProject />} onSearch={handleGetContents} />
                </div>
            )}

            { isTableVisible &&
                    
                <div>
                    <TableContents 
                        contentsData={contents} 
                        onLoading={loading} 
                    />
                </div>
            }

        </div> 
    )
}

export default AdminContents;
