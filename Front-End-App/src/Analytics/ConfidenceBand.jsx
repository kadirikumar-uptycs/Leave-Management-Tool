import React from 'react';
import ReactECharts from 'echarts-for-react';
import data from './confidenceBandData.json';

const ConfidenceBand = ({ darkTheme }) => {
    let base = -data.reduce(function (min, val) {
        return Math.floor(Math.min(min, val.l));
    }, Infinity);
    let option = {
        title: {
            text: 'Confidence Band',
            subtext: 'Example in MetricsGraphics.js',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                animation: false,
                label: {
                    backgroundColor: '#ccc',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    shadowBlur: 0,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    color: '#222'
                }
            },
            formatter: function (params) {
                return (
                    params[2].name +
                    '<br />' +
                    ((params[2].value - base) * 100).toFixed(1) +
                    '%'
                );
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: data.map(function (item) {
                return item.date;
            }),
            axisLabel: {
                formatter: function (value, idx) {
                    var date = new Date(value);
                    return idx === 0
                        ? value
                        : [date.getMonth() + 1, date.getDate()].join('-');
                }
            },
            boundaryGap: false
        },
        yAxis: {
            axisLabel: {
                formatter: function (val) {
                    return (val - base) * 100 + '%';
                }
            },
            axisPointer: {
                label: {
                    formatter: function (params) {
                        return ((params.value - base) * 100).toFixed(1) + '%';
                    }
                }
            },
            splitNumber: 3
        },
        series: [
            {
                name: 'L',
                type: 'line',
                data: data.map(function (item) {
                    return item.l + base;
                }),
                lineStyle: {
                    opacity: 0
                },
                stack: 'confidence-band',
                symbol: 'none'
            },
            {
                name: 'U',
                type: 'line',
                data: data.map(function (item) {
                    return item.u - item.l;
                }),
                lineStyle: {
                    opacity: 0
                },
                areaStyle: {
                    color: '#ccc'
                },
                stack: 'confidence-band',
                symbol: 'none'
            },
            {
                type: 'line',
                data: data.map(function (item) {
                    return item.value + base;
                }),
                itemStyle: {
                    color: '#333'
                },
                showSymbol: false
            }
        ]
    };
    return (
        <ReactECharts
            option={option}
            theme={darkTheme ? "dark" : 'light'}
            style={{ height: '100%', width: '100%' }}
        />
    );
}

export default ConfidenceBand;
