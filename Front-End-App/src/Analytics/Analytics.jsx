import React, { useLayoutEffect, useState } from 'react';
import ThemeSwitch from './Switch';
import BarChart from './BarChart';
import generateRandomAttendanceData from './DataGenerator';
import './Analytics.css';

let AttendanceData1 = generateRandomAttendanceData();
let AttendanceData2 = generateRandomAttendanceData();
let AttendanceData3 = generateRandomAttendanceData();
let AttendanceData4 = generateRandomAttendanceData();
let AttendanceData5 = generateRandomAttendanceData();


const bar1Options = {
    title: "Leaves type vise",
    color: ['#37A2FF', '#FFBF00'],
    xAxis: {
        data: ['Leaves']
    },
    tooltip: {
        trigger: 'item',
    },
    series: [
        {
            name: 'Sick',
            data: [10],
            type: 'bar',
            label: {
                show: true,
            }
        },
        {
            name: 'Casual',
            data: [52.5],
            type: 'bar',
            label: {
                show: true,
            }
        }
    ]
}
const bar2Options = {
    title: "Leaves shift vise",
    color: ['#80FFA5', '#00DDFF'],
    xAxis: {
        data: ['Leaves']
    },
    yAxis: {
        name: 'Count',
    },
    tooltip: {
        trigger: 'item',
    },
    series: [
        {
            name: 'India',
            data: [42.5],
            type: 'bar',
            label: {
                show: true,
            }
        },
        {
            name: 'America',
            data: [20],
            type: 'bar',
            label: {
                show: true,
            }
        }
    ]
}

const Line1Options = {
    title: "Shift Attendance Percentage for last 365 days",
    color: ['#37A2FF', '#FF0087'],
    xAxis: {
        type: 'category',
        data: AttendanceData1.map(item => item.date),
    },
    yAxis: {
        type: 'value',
        min: 80,
        max: 100,
        interval: 2,
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            let tooltipContent = `<strong>${params[0].axisValue}</strong><br/>`;
            params.forEach(param => {
                tooltipContent += `${param.marker} ${param.seriesName} &nbsp;&nbsp;<strong style="color:${param.color}">${param.value}%</strong><br/>`;
            });
            return tooltipContent;
        }
    },
    series: [
        {
            name: 'India',
            data: AttendanceData1.map(item => item.value),
            type: 'line',
            label: {
                show: false,
            }
        },
        {
            name: 'America',
            data: AttendanceData2.map(item => item.value),
            type: 'line',
            label: {
                show: false,
            }
        }
    ]
};

const Line2Options = {
    title: "Individual Attendance Percentage for last 365 days",
    xAxis: {
        type: 'category',
        data: AttendanceData1.map(item => item.date),
    },
    yAxis: {
        type: 'value',
        min: 90,
        max: 100,
        interval: 2,
    },
    tooltip: {
        trigger: 'axis',
        formatter: function (params) {
            let tooltipContent = `<strong>${params[0].axisValue}</strong><br/>`;
            params.forEach(param => {
                tooltipContent += `${param.marker} ${param.seriesName} &nbsp;&nbsp;<strong style="color:${param.color}">${param.value}%</strong><br/>`;
            });
            return tooltipContent;
        }
    },
    series: [
        {
            name: 'Person1',
            data: AttendanceData1.map(item => item.value),
            type: 'line',
            label: {
                show: false,
            }
        },
        {
            name: 'Person2',
            data: AttendanceData2.map(item => item.value),
            type: 'line',
            label: {
                show: false,
            }
        },
        {
            name: 'Person3',
            data: AttendanceData3.map(item => item.value),
            type: 'line',
            label: {
                show: false,
            }
        },
        {
            name: 'Person4',
            data: AttendanceData4.map(item => item.value),
            type: 'line',
            label: {
                show: false,
            }
        },
        {
            name: 'Person5',
            data: AttendanceData5.map(item => item.value),
            type: 'line',
            label: {
                show: false,
            }
        }
    ]
};

const Analytics = () => {
    let [darkTheme, setDarkTheme] = useState(false);
    useLayoutEffect(() => {
        document.title = "Analytics";
    }, [])
    return (
        <div>
            <div className='theme-switch'>
                <ThemeSwitch dark={darkTheme} handleSwitchChange={(checked) => setDarkTheme(checked)} />
            </div>
            <div className='chart-wrapper two-cols-view'>
                <div className={`chart chart-1 ${darkTheme ? 'dark' : ''}`}>
                    <BarChart darkTheme={darkTheme} chartOptions={bar1Options} />
                </div>
                <div className={`chart chart-1 ${darkTheme ? 'dark' : ''}`}>
                    <BarChart darkTheme={darkTheme} chartOptions={bar2Options} />
                </div>
            </div>
            <div className='chart-wrapper'>
                <div className='chart'>
                    <BarChart darkTheme={darkTheme} chartOptions={Line1Options} />
                </div>
            </div>
            <div className='chart-wrapper'>
                <div className='chart'>
                    <BarChart darkTheme={darkTheme} chartOptions={Line2Options} />
                </div>
            </div>
        </div>
    );
}

export default Analytics;
