import React from 'react';
import ReactECharts from 'echarts-for-react';

const BarChart = ({darkTheme, chartOptions}) => {
    const option = {
        color: chartOptions.color,
        legend: {
            show: true,
            bottom: 10,
        },
        title: {
            text: chartOptions.title,
            textStyle: {
                color: darkTheme?'#f3f3f3':'#0c0048',
                fontFamily: 'Times New Roman',
                fontWeight: '700',
                fontSize: '19px'
            },
            top: '5%',
            left: '5%'
        },
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'shadow'
            },
            ...chartOptions.tooltip,
        },
        toolbox: {
            show: true,
            top: '5%',
            right: '5%',
            feature: {
                dataZoom: {
                    yAxisIndex: "none"
                },
                dataView: {
                    readOnly: false
                },
                magicType: {
                    type: ['line', 'bar', 'stack']
                },
                restore: {},
                saveAsImage: {}
            }
        },
        grid: {
            top: '20%',
            left: '8%',
            right: '4%',
            bottom: '11%',
            containLabel: true,
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                ...chartOptions.xAxis,
            }
        ],
        yAxis: [
            {
                name: 'Count',
                nameGap: 37,
                nameLocation: "middle",
                type: 'value',
                ...chartOptions.yAxis,
            }
        ],
        series: chartOptions.series.map(item => {
            return {
                barWidth: '30%',
                ...item,
            }
        })
    };

    return (
        <ReactECharts
            option={option}
            theme={darkTheme?"dark":'light'}
            style={{ height: '100%', width: '100%' }}
        />
    );
};

export default BarChart;
