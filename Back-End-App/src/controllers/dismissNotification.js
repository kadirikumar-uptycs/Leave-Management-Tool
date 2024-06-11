const mongoose = require('mongoose');
const User = require('../models/user');
const { error } = require('../helpers/textColors');

const dismissNotification = async (req, res) => {
    const notificationId = req?.params?.id;
    const userInfo = req?.user;
    const userId = userInfo?._id;
    if (!notificationId) {
        return res.status(200).send('done!');
    }

    try {
        const objectId = new mongoose.Types.ObjectId(notificationId);

        await User.findByIdAndUpdate(
            userId,
            {
                $pull: {
                    notifications: { id: objectId }
                }
            }
        );
        return res.status(200).send('done!!!');
    } catch (err) {
        console.log("error while dismissing Notification", err);
        return res.status(500).send({ message: err.message });
    }
};

module.exports = dismissNotification;