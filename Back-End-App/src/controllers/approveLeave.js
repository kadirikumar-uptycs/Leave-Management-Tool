const LeaveApplication = require('../models/leaveApplication');
const User = require('../models/user');

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
                    $set: { status: 'Approved' }
                },
                { new: true }
            );

            if (!leave) {
                return res.status(404).send({ message: 'Leave application not found' });
            }
            return res.status(200).send(leave);
        } else {
            return res.status(403).send({ message: 'Unauthorized: Admin access required' });
        }
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

module.exports = approveLeave;
