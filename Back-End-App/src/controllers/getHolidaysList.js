let allHolidays = require('../holidays.json');

let getHolidaysList = (req, res) => {
    try {
        let searchParams = req.query;
        let requestedList = JSON.parse(JSON.stringify(allHolidays));
        if (searchParams?.shift) {
            requestedList = requestedList.filter(holiday =>
                Array.isArray(holiday?.tags) && holiday?.tags?.includes(searchParams?.shift)
            );
        }
        return res.status(200).send(requestedList);
    } catch (err) {
        return res.status(500).send(err)
    }
}

module.exports = getHolidaysList;