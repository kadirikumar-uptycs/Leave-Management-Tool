import events from '../Calendar/events.json';
import { formatDateToStandard } from '../common/getCurrentDate';


function isSameDates(date1, date2) {
    return formatDateToStandard(date1) === formatDateToStandard(date2)
}

export function countWorkingDays(shift) {
    let holidays = events.filter(holiday => holiday.tags.includes(shift)).map(holiday => holiday.date);
    let now = new Date();
    let firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    let lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    let workingDaysCount = 0;

    for (let day = new Date(firstDayLastMonth); day <= lastDayLastMonth; day.setDate(day.getDate() + 1)) {
        if (day.getDay() !== 0 && day.getDay() !== 6) {
            let formattedDate = formatDateToStandard(day);
            if (!holidays.includes(formattedDate)) {
                workingDaysCount++;
            }
        }
    }
    return workingDaysCount;
}

export function countLeaves(shift, leaves) {
    let leavesTemp = JSON.parse(JSON.stringify(leaves));
    let holidays = events.filter(holiday => holiday.tags.includes(shift)).map(holiday => holiday.date);
    let totalLeaveDays = 0;
    let now = new Date();
    let firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    let lastDayLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    leavesTemp.forEach(leave => {
        let leaveStartDate = new Date(leave.from);
        let leaveEndDate = new Date(leave.to);
        let startDate = leaveStartDate < firstDayLastMonth ? firstDayLastMonth : leaveStartDate;
        let endDate = leaveEndDate > lastDayLastMonth ? lastDayLastMonth : leaveEndDate;

        for (let currentDate = new Date(startDate); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
            if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
                let formattedDate = formatDateToStandard(currentDate);
                if (!holidays.includes(formattedDate)) {
                    if (isSameDates(currentDate, startDate)) {
                        totalLeaveDays += (leave.fromType !== 'Full') ? 0.5 : 1;
                    } else if (isSameDates(currentDate, endDate)) {
                        totalLeaveDays += (leave.toType !== 'Full') ? 0.5 : 1;
                    } else {
                        totalLeaveDays++;
                    }
                }
            }
        }
    });
    return totalLeaveDays;
}