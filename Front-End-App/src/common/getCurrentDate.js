export function getCurrentDate() {
	const currentDate = new Date();
	const monthAbbreviation = currentDate.toLocaleString("default", {
		month: "short",
	});
	const date = currentDate.getDate();
	const year = currentDate.getFullYear();

	const result = `${date < 10 ? "0" : ""}${date} ${monthAbbreviation} ${year}`;
	return result;
}

export function formatDate(date) {
	date = new Date(date);
	const options = { day: "2-digit", month: "short", year: "numeric" };
	const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
	return formattedDate;
}

export function parseDate(date) {
	date = new Date(date);
	const monthAbbreviation = date.toLocaleString("default", {
		month: "short",
	});
	const day = date.toLocaleString("default", {
		day: "2-digit",
	});
	const weekDay = date.toLocaleString("default", {
		weekday: "short",
	});
	return {
		day,
		weekDay,
		month: monthAbbreviation,
	};
}


export function getLastMonthName(){
	let now = new Date();
    let firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
	return firstDayLastMonth.toLocaleString("default", {
		month: "long"
	});
}


export function getEndDate(startDate, daysCount) {
	const start = new Date(startDate);
	const endTimestamp = start.getTime() + (daysCount - 1) * 24 * 60 * 60 * 1000;
	const endDate = new Date(endTimestamp);
	return endDate;
}


export function formatDateToStandard(date) {
	date = new Date(date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}


export function differenceInDays(date1, date2) {
	date1 = new Date(date1);
	date2 = new Date(date2);
    var differenceMs = date2.getTime() - date1.getTime();
    var differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    return differenceDays;
}

export function getDayAndMonth(date){
	const {day, month} = parseDate(date);
	return day + ' ' + month
}
