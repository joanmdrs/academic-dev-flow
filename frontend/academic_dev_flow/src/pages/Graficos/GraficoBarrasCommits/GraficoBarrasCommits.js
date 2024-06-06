import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const GraficoBarrasCommits = ({ commitsData }) =>  {

    const extractCommitData = () => {
        const dataByUser = {};
        commitsData.forEach((commit) => {
            const user = commit.assignee;
            if (!dataByUser[user]) {
                dataByUser[user] = 1;
            } else {
                dataByUser[user]++;
            }
        });
        return dataByUser;
    };

    const commitData = extractCommitData();

    const seriesData = Object.entries(commitData).map(([user, value]) => ({
        user: user,
        value: value
    }));

    return (
        <BarChart
            xAxis={[{ 
                scaleType: 'band', 
                data: Object.keys(commitData), 
            }]}
            series={[{ data: seriesData.map(commit => commit.value) }]}
            width={1000}         
            height={500}
            skipAnimation
        />
    );
}

export default GraficoBarrasCommits;
