import { Collapse, Drawer, Layout, List } from "antd";
import React, { useEffect, useState } from "react";
import { useContextoIteracao } from "../../context/contextoIteracao";
import { listarTarefasPorIteracao } from "../../../../services/tarefaService";
import { listarArtefatosPorIteracao } from "../../../../services/artefatoService";
import Loading from "../../../../components/Loading/Loading";
import ExibirIteracao from "../../components/ExibirIteracao/ExibirIteracao";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";


const {Content} = Layout

const VisualizarIteracao = ({isDrawerVisible, closeDrawer}) => {

    const {dadosIteracao} = useContextoIteracao()
    const {dadosProjeto} = useContextoGlobalProjeto()

    const [tarefas, setTarefas] = useState([])
    const [artefatos, setArtefatos] = useState([])
    const [loading, setLoading] = useState(true)



    const handleGetTarefas = async () => {

        const response = await listarTarefasPorIteracao(dadosIteracao.id)

        if (!response.error) {
            setTarefas(response.data)
        }
    }

    const handleGetArtefatos = async () => {

        const response = await listarArtefatosPorIteracao(dadosIteracao.id)

        if (!response.error){
            setArtefatos(response.data)
        }
    }

    
    
    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto) {
                await handleGetTarefas()
                await handleGetArtefatos()
            }
            setLoading(false);
        };
        fetchData();
    }, [dadosProjeto]);



    if (loading) {
        return <Loading />;
    }


    const items = [
        {
            key: '1',
            label: 'Iteração',
            children: <ExibirIteracao  />

        }, 
        {
            key: '2',
            label: 'Tarefas',
            children: (
                <List
                    itemLayout="horizontal"
                    dataSource={tarefas}
                    renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                        title={item.nome} 
                        description={item.descricao}
                        />
                    </List.Item>
                    )}
                />
            ) 
        },
        {
            key: '3',
            label: 'Artefatos',
            children: (
                <List
                    itemLayout="horizontal"
                    dataSource={artefatos}
                    renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                        title={item.nome} 
                        description={item.descricao}
                        />
                    </List.Item>
                    )}
                />
            ) 
        },
    ];

    return (
        <Drawer
            title={`${dadosIteracao?.nome} - ${dadosIteracao?.nome_projeto}`}
            width={1000}  // Define uma largura máxima para o Drawer
            onClose={closeDrawer}
            open={isDrawerVisible}
            placement="right"
            maskClosable={false}
        >
            
            <Collapse bordered={false} style={{marginTop: '20px'}} items={items} defaultActiveKey={['1']} />
        </Drawer>
    )

}



export default VisualizarIteracao