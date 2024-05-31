const LeaveApplication = require('../models/leaveApplication');

const applyLeave = async (req, res) => {
    try {
        let userId = req?.user?._id;
        const leave = new LeaveApplication({
            ...req.body,
            userId,
            status: 'Pending',

        });
        await leave.save()
        return res.status(201).json(leave);
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};


module.exports = applyLeave;