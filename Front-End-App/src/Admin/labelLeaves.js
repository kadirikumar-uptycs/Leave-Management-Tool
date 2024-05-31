import { formatDateToStandard } from "../common/getCurrentDate";

const isSameDate = (date1, date2) => {
    return formatDateToStandard(new Date(date1)) === formatDateToStandard(new Date(date2));
};

const isDateInRange = (date, start, end) => {
    const formattedDate = new Date(date);
    return formattedDate >= new Date(start) && formattedDate <= new Date(end);
};

const getStartOfWeek = (date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);
    return start;
};

const getEndOfWeek = (startOfWeek) => {
    const end = new Date(startOfWeek);
    end.setDate(startOfWeek.getDate() + 6);
    return end;
};


const getLabelledLeavesData = (leaves) => {
    const today = formatDateToStandard(new Date());
    const startOfWeek = getStartOfWeek(new Date());
    const endOfWeek = getEndOfWeek(startOfWeek);
    const nextWeekStart = new Date(startOfWeek);
    nextWeekStart.setDate(nextWeekStart.getDate() + 7);
    const nextWeekEnd = new Date(endOfWeek);
    nextWeekEnd.setDate(nextWeekEnd.getDate() + 7);

    let data = ["Today", "This Week", "Next Week"].map(label => ({
        label,
        profiles: new Set(),
    }));

    for (const leave of leaves) {
        const from = leave.from;
        const to = leave.to;
        if (leave.status !== 'Approved') continue
        const profileData = {
            name: leave.name,
            role: leave.role,
            profileImage: leave.profileImage,
        };

        if (
            isSameDate(today, from) ||
            isSameDate(today, to) ||
            isDateInRange(today, from, to)
        ) {
            data[0].profiles.add(JSON.stringify(profileData));
        }

        if (
            isDateInRange(startOfWeek, from, to) ||
            isDateInRange(endOfWeek, from, to) ||
            isDateInRange(from, startOfWeek, endOfWeek) ||
            isDateInRange(to, startOfWeek, endOfWeek)
        ) {
            data[1].profiles.add(JSON.stringify(profileData));
        }

        if (
            isDateInRange(nextWeekStart, from, to) ||
            isDateInRange(nextWeekEnd, from, to) ||
            isDateInRange(from, nextWeekStart, nextWeekEnd) ||
            isDateInRange(to, nextWeekStart, nextWeekEnd)
        ) {
            data[2].profiles.add(JSON.stringify(profileData));
        }
    }

    return data.map(({ label, profiles }) => ({
        label,
        profiles: Array.from(profiles).map(profile => JSON.parse(profile)),
    }));
};

export default getLabelledLeavesData;