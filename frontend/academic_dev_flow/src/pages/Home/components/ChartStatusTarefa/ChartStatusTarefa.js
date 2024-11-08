import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts"

const ChartStatusTarefa = ({tarefas}) => {

    const [series, setSeries] = useState([])

    const options = {
        chart: {
            type: "donut",
        },
        labels: ["Criada", "Andamento", "Concluída", "Cancelada"],
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
            criada: 0,
            andamento: 0,
            concluida: 0,
            cancelada: 0
        }

        tarefas.forEach(tarefa => {
            if(statusCount[tarefa.status] !== undefined){
                statusCount[tarefa.status] += 1
            }
        });

        setSeries([
            statusCount.criada,
            statusCount.andamento,
            statusCount.concluida,
            statusCount.cancelada
        ])
    }, [tarefas])

    return (
        <div id="chart">
            <ReactApexChart width={450} height={450} options={options} series={series} type="donut" />
        </div>
    )
}

export default ChartStatusTarefa