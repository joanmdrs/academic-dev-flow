import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts"

const ChartStatusProjeto = ({projetos, width, height}) => {

    const [series, setSeries] = useState([])

    const options = {
        chart: {
            type: "donut",
        },
        labels: ["Criado", "Em andamento", "Concluído", "Cancelado"],
        reponsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legent: {
                        position: "bottom"
                    },
                },
            },
        ]
    }

    useEffect(() => {
        const statusCount = {
            criado: 0,
            andamento: 0,
            concluido: 0,
            cancelado: 0
        }

        projetos.forEach(projeto => {
            if(statusCount[projeto.status_projeto ? projeto.status_projeto : projeto.status] !== undefined){
                statusCount[projeto.status_projeto ? projeto.status_projeto : projeto.status] += 1
            }
        });

        setSeries([
            statusCount.criado,
            statusCount.andamento,
            statusCount.concluido,
            statusCount.cancelado
        ])
    }, [projetos])

    return (
        <div id="chart">
            <ReactApexChart width={width} height={height} options={options} series={series} type="donut" />
        </div>
    )
}

export default ChartStatusProjeto