import React, { useState } from "react";
import Aviso from "../../../../components/Aviso/Aviso";
import { Button, Empty, Spin } from "antd";
import { FaFilter } from "react-icons/fa";
import { FaArrowRotateRight } from "react-icons/fa6";
import { BsQuestionCircle } from "react-icons/bs";
import GraficoBarrasCommits from "../../../Graficos/GraficoBarrasCommits/GraficoBarrasCommits";
import { useContextoCommits } from "../../context/ContextoCommits";
import FormBuscarCommits from "../../components/FormBuscarCommits/FormBuscarCommits";
import Loading from "../../../../components/Loading/Loading";

const GerenciarCommits = () => {

    const {commits, setCommits, loading} = useContextoCommits()
    const [isAvisoVisivel, setIsAvisoVisivel] = useState(false);
    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false)

    const handleDuvidaClick = () => {
        setIsAvisoVisivel(true);
    };

    const handleAvisoClose = () => {
        setIsAvisoVisivel(false);
    };
    
    const handleResetar = () => {
        setCommits([]);
        setIsFormBuscarVisivel(false)
    };

    const handleFiltrar = () => {
        setIsFormBuscarVisivel(!isFormBuscarVisivel)
    }

    return (
        <React.Fragment>
            {isAvisoVisivel && (
                <Aviso
                    titulo="AVISO"
                    descricao="Nesta tela, o usuário consegue listar todos os commits do repositório vinculados a este projeto. Além disso, é possível filtrar os commits por usuário e data."
                    visible={isAvisoVisivel}
                    onClose={handleAvisoClose}
                />
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button
                        icon={<FaArrowRotateRight />}
                        onClick={handleResetar}
                        danger
                        ghost
                    >
                        Resetar
                    </Button>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button
                        icon={<BsQuestionCircle />}
                        onClick={handleDuvidaClick}
                    />
                </div>
            </div>

            <div className="global-div" style={{margin: '0', marginTop: '20px'}}>

                <FormBuscarCommits />

                <div style={{marginTop: '40px'}}>

                    { loading ? 
                        (
                            <div style={{
                                width: '100%', 
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '5%'

                            }}>
                                <Spin size="large" tip="Carregando" />
                            </div>
                        )
                        :
                        (
                            <React.Fragment>
                                {   commits.length > 0 ? 
                                    <GraficoBarrasCommits commitsData={commits} /> 

                                    : 
                                    
                                    <Empty 
                                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                        
                                        description="Não há dados a serem exibidos!" 
                                    />
                                }
                            </React.Fragment>
                        ) 
                    }
                </div>
            </div>
        </React.Fragment>
    );
};

export default GerenciarCommits;
