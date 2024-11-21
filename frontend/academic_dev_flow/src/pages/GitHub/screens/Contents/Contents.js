import React, { useState } from "react";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { Input, Result } from "antd";
import SpinLoading from "../../../../components/SpinLoading/SpinLoading";
import { listContents } from "../../../../services/githubIntegration";
import TableContents from "../../components/TableContents/TableContents";
import { NotificationManager } from "react-notifications";
const {Search} = Input

const Contents = () => {
    const { dadosProjeto} = useContextoGlobalProjeto();
    const [contents, setContents] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const handleBuscarContents = async (folder) => {

        if (dadosProjeto.token && dadosProjeto.nome_repo && folder){
            setIsLoading(true);
            const parametros = {
                github_token: dadosProjeto.token,
                repository: dadosProjeto.nome_repo,
                folder: folder
            };

            const response = await listContents(parametros);

            if (!response.error && response.data) {
            setContents(response.data)
            }
            setIsLoading(false);
        }

        if (!folder){
            NotificationManager.info(
                'É necessário informar a pasta onde os contents estão localizados !')
        }
    };

    return (
        <div>

            <div style={{padding: '20px'}}>
                {(dadosProjeto?.token &&  dadosProjeto?.nome_repo) ? (
                    <div> 
                        <div 
                            className="pa-t-20 pa-b-20"
                            style={{
                                borderBottom: '1px solid #ddd',
                                display: 'flex',
                                justifyContent: 'space-between'

                            }}> 

                            <Search
                                style={{width: '500px'}}
                                placeholder="informe a pasta onde os contents estão localizados"
                                enterButton="Pesquisar"
                                size="middle"
                                onSearch={handleBuscarContents}
                            />
                        </div>

                        <div>
                            {isLoading ? (
                                <SpinLoading />
                            ) : (
                                <TableContents data={contents} />
                            )
                            }
                        </div>
                        
                    </div>
                    
                ) : (
                    <Result
                        status="info"
                        title="Este projeto não possui credenciais de acesso a um repositório do GitHub."
                        subTitle="Para realizar a conexão com o GitHub, adicione as informações de acesso ao repositório no menu de Projetos."
                    />
                )}
            </div>
        </div>
    );
};

export default Contents;
