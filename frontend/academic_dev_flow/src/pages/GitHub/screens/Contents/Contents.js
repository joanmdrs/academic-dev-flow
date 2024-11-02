import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import { handleError } from "../../../../services/utils";
import { Input, Result } from "antd";
import SpinLoading from "../../../../components/SpinLoading/SpinLoading";
import { listContents } from "../../../../services/githubIntegration";
import TableContents from "../../components/TableContents/TableContents";
import { NotificationManager } from "react-notifications";
const {Search} = Input

const Contents = () => {
    const { dadosProjeto, setDadosProjeto } = useContextoGlobalProjeto();
    const location = useLocation();
    const { state } = location;
    const [contents, setContents] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const handleBuscarProjeto = async () => {
        const response = await buscarProjetoPeloId(state.idProjeto);
        if (!response.error) {
            setDadosProjeto(response.data);
        }
    };

    const handleBuscarContents = async (folder) => {

        if (state.tokenGithub && state.repoGithub && folder){
            setIsLoading(true);
            const parametros = {
                github_token: state.tokenGithub,
                repository: state.repoGithub,
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (state.idProjeto) {
                    await handleBuscarProjeto();
                }
            } catch (error) {
                handleError(error, "Falha ao tentar buscar os dados!");
            }
        };
        fetchData();
    }, [state]);

    return (
        <div className="global-div" style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
            <div
                style={{
                    borderBottom: "1px solid #ddd",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    padding: "20px",
                    backgroundColor: "#FFFFFF",
                }}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <h2 style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontWeight: "600" }}>
                        Integração com o GitHub
                    </h2>
                    <h4 style={{ margin: 0, fontFamily: "Poppins, sans-serif", fontWeight: "400" }}>
                        {dadosProjeto?.nome} | Contents
                    </h4>
                </div>
            </div>

            <div style={{
                    borderBottom: '1px solid #ddd',
                    padding: '20px',
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

            <div style={{padding: '20px'}}>
                {state.repoGithub && state.tokenGithub ? (
                    <React.Fragment>
                        {isLoading ? (
                            <SpinLoading />
                        ) : (
                            <TableContents data={contents} />
                        )
                        }
                    </React.Fragment>
                    
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
