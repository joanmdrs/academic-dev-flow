import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { Empty } from 'antd';

const GraficoBarrasCommits = ({ data }) =>  {

    const extractCommitData = () => {
        const dataByUser = {};
        data.forEach((commit) => {
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
        <React.Fragment>
            {
                data.length !== 0 ? (
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
                
            ) : (
                <Empty
                    description="Não há dados para exibir"
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    style={{
                        display: 'flex',
                        width: "100%",
                        height: "100%",
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '20px'
                    }}
                >
                </Empty>
            )
            }
        </React.Fragment>
        
    );
}

export default GraficoBarrasCommits;
