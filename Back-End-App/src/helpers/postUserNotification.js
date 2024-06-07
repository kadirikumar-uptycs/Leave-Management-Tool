const mongoose = require('mongoose');
const User = require('../models/user');
const { error } = require('./textColors');

const generateUniqueId = async () => {
    let id;
    let isUnique = false;

    while (!isUnique) {
        id = new mongoose.Types.ObjectId();
        const existingNotification = await User.findOne({ 'notifications.id': id });

        if (!existingNotification) {
            isUnique = true;
        }
    }

    return id;
};

const formatNotification = async (heading, type, description) => ({
    id: await generateUniqueId(),
    heading,
    type,
    description,
    createdAt: new Date().toUTCString(),
});

const notificationToManagers = async (notification) => {
    try {
        await User.updateMany(
            { roles: 'Manager' },
            { $addToSet: { notifications: notification } }
        );
    } catch (err) {
        error(err);
    }
};

const notificationToUsers = async (notification, userId) => {
    try {
        await User.findByIdAndUpdate(userId,
            { $addToSet: { notifications: notification } }
        );
    } catch (err) {
        error(err);
    }
};

module.exports = {
    formatNotification,
    notificationToManagers,
    notificationToUsers,
};