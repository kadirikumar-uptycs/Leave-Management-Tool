const LeaveApplication = require('../models/leaveApplication');
const { formatNotification, notificationToManagers } = require('../helpers/postUserNotification');
const { sendleaveApplicationNotificationMail } = require('../helpers/mailSender');

const applyLeave = async (req, res) => {
    try {
        const userInfo = req?.user;
        let userId = userInfo?._id;
        const leave = new LeaveApplication({
            ...req.body,
            userId,
            status: 'Pending',

        });
        await leave.save();
        notificationToManagers(
            await formatNotification(
                'Leave Application Received',
                'info',
                `${userInfo.name} requested for ${leave.noOfDays} day${leave.noOfDays !== 1 && 's'} of ${leave.type} leave`
            )
        )
        sendleaveApplicationNotificationMail(leave);
        return res.status(201).json(leave);
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};


module.exports = applyLeave;