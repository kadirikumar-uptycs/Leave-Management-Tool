import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLeaves } from '../store/leaveSlice';
import ThemeSwitch from './Switch';
import BarChart from './BarChart';
import { leaveTypeBarOptions, shiftWiseBarOptions } from './chartOptions';
import generateRandomAttendanceData from './DataGenerator';
import './Analytics.css';

let AttendanceData1 = generateRandomAttendanceData();
let AttendanceData2 = generateRandomAttendanceData();
let AttendanceData3 = generateRandomAttendanceData();
let AttendanceData4 = generateRandomAttendanceData();
let AttendanceData5 = generateRandomAttendanceData();



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
    const dispatch = useDispatch();
    const leaveState = useSelector(state => state.leave);
    const leaves = leaveState.leaves;
    // const loading = leaveState.loading;
    const errors = leaveState.error;
    const noData = leaveState.noData;

    // chart options
    const bar1Options = leaveTypeBarOptions(leaves);
    const bar2Options = shiftWiseBarOptions(leaves);


    useLayoutEffect(() => {
        document.title = "Analytics";
    }, []);

    useEffect(() => {
        if (Array.isArray(leaves) && !leaves.length && !noData && !errors) {
            dispatch(fetchLeaves());
        }

    }, [dispatch, leaves, errors, noData]);

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
