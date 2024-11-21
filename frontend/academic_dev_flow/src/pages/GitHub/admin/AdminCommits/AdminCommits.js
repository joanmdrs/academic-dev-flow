import React from "react";
import { Tabs } from "antd";
import { useContextoCommits } from "../../context/ContextoCommits";
import FormBuscarCommits from "../../components/FormBuscarCommits/FormBuscarCommits";
import Titulo from "../../../../components/Titulo/Titulo";
import SelectProject from "../../components/SelectProject/SelectProject";
import SpinLoading from "../../../../components/SpinLoading/SpinLoading";
import RenderEmpty from "../../../../components/Empty/Empty";
import { VscGraph } from "react-icons/vsc";
import GraficoBarrasCommits from "../../../Graficos/GraficoBarrasCommits/GraficoBarrasCommits";

const {TabPane} = Tabs

const AdminCommits = () => {
    const { commits, loading} = useContextoCommits()

    return (
        <div className="content">
            <Titulo 
                titulo='Gerenciar Commits'
                paragrafo='GitHub > Commits > Gerenciar Commits'
            />

            <div style={{
                marginTop: '10px',
                padding: '10px'
            }}> 
                <FormBuscarCommits selectProjeto={<SelectProject />}/>
            </div>

            <div style={{marginTop: '40px'}}>
                { loading ? (
                    <SpinLoading />
                ) : (
                    <React.Fragment>
                        { commits.length > 0 ? (

                            <Tabs tabPosition="right">
                                <TabPane tab={<VscGraph size="20px"/>} key="1">
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}> 
                                        <GraficoBarrasCommits data={commits} />
                                    </div>
                                </TabPane>
                            </Tabs>
                            
                        ) : (
                            <RenderEmpty title="Nenhum dado para exibir" />
                        )}
                    </React.Fragment>
                    
                )}
            </div>

   


        

        </div> 
    )
};

export default AdminCommits;
