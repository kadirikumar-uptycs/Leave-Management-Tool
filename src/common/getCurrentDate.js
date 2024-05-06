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

export function getEndDate(startDate, daysCount) {
  const start = new Date(startDate);
  const endTimestamp = start.getTime() + ((daysCount-1) * 24 * 60 * 60 * 1000);
  const endDate = new Date(endTimestamp);
  return endDate;
}
