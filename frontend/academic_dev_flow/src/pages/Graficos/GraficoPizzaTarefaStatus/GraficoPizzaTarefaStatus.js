import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography } from '@mui/material';

const GraficoPizzaTarefaStatus = ({titulo, taskData }) => {

    const statusCounts = taskData.reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
    }, {});

    const data = Object.entries(statusCounts).map(([status, count], index) => ({
        label: status,
        value: count,
        id: index
    }));


    return (
        <Box flexGrow={1}>
            <PieChart            
                width={600}
                height={300}
                series={[
                    {
                    data: data
                    },
                ]}
            />
        </Box>
    );
};


export default GraficoPizzaTarefaStatus;
