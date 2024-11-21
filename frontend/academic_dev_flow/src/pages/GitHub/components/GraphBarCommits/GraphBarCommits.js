import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const GraphBarCommits = ({ data }) => {
  const defaultColors = ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e', '#f48024', '#69d2e7'];

  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'bar',
      height: '100%',
      width: '100%',
    },
    plotOptions: {
      bar: {
        barHeight: '80%', // Reduz para dar mais espaço entre as barras
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: 'bottom'
        },
      }
    },
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#fff']
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
      },
      offsetX: 0,
      dropShadow: {
        enabled: true
      }
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    xaxis: {
      categories: []
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function () {
            return ''
          }
        }
      }
    }
  });

  const [series, setSeries] = useState([{
    data: []
  }]);

  useEffect(() => {
    const assignees = data.map(commit => commit.assignee);
    const commitCounts = assignees.reduce((acc, assignee) => {
      acc[assignee] = (acc[assignee] || 0) + 1;
      return acc;
    }, {});

    const categories = Object.keys(commitCounts);
    const counts = Object.values(commitCounts);

    const colors = categories.map((_, index) => defaultColors[index % defaultColors.length]);

    setChartOptions(prevOptions => ({
      ...prevOptions,
      xaxis: {
        categories
      },
      colors
    }));

    setSeries([{
      data: counts
    }]);
  }, [data]);

    return (
        <div style={{ width: '90%', height: '100vh', margin: '0 auto' }}>
            <ReactApexChart options={chartOptions} series={series} type="bar" height="50%" width="100%" />
        </div>
    );
};

export default GraphBarCommits;
