function getTotalLeavesByKey(data, key, value) {
    let total = data.filter(item => item[key] === value && item.status === 'Approved').reduce((total, item) => total += item.noOfDays, 0);
    console.log(total);
    return total
}

export const leaveTypeBarOptions = (data) => ({
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
            data: [getTotalLeavesByKey(data, 'type', 'Sick')],
            type: 'bar',
            label: {
                show: true,
            }
        },
        {
            name: 'Casual',
            data: [getTotalLeavesByKey(data, 'type', 'Casual')],
            type: 'bar',
            label: {
                show: true,
            }
        }
    ]
});


export const shiftWiseBarOptions = (data) => ({
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
            data: [getTotalLeavesByKey(data, 'shift', 'IND')],
            type: 'bar',
            label: {
                show: true,
            }
        },
        {
            name: 'America',
            data: [getTotalLeavesByKey(data, 'shift', 'US')],
            type: 'bar',
            label: {
                show: true,
            }
        }
    ]
});