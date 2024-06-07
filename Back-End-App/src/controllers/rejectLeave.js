const LeaveApplication = require('../models/leaveApplication');
const User = require('../models/user');
const { formatNotification, notificationToUsers } = require('../helpers/postUserNotification');
const { sendleaveProcessedNotificationMail } = require('../helpers/mailSender');


const approveLeave = async (req, res) => {
    try {
        let leaveId = req.params?.id;
        let userId = req?.user?._id;
        let user = await User.findById(userId);

        if (!user) {
            return res.status(401).send({ message: 'Session User not Found' });
        }

        // Check if the user has Admin access level
        if (user.accessLevel === 'Admin') {
            let leave = await LeaveApplication.findByIdAndUpdate(
                leaveId,
                {
                    $set: { status: 'Rejected' }
                },
                { new: true }
            );

            if (!leave) {
                return res.status(404).send({ message: 'Leave application not found' });
            }
            // Add Notification to User Database
            notificationToUsers(
                await formatNotification(
                    'Leave Rejected',
                    'error',
                    `Your Leave Applied on ${new Date(leave.createdAt).toUTCString()} has been Rejected`
                ),
                leave.userId
            );
            sendleaveProcessedNotificationMail(leave);
            return res.status(200).send(leave);
        } else {
            return res.status(403).send({ message: 'Unauthorized: Admin access required' });
        }
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

module.exports = approveLeave;
