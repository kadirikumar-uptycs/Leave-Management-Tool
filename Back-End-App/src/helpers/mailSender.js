require('dotenv').config();
const nodemailer = require('nodemailer');
const User = require('../models/user');
const { leaveNotification, leaveProcessed, newUserAdded } = require('./EmailTemplates');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

const mailOptions = {
    from: 'kadirikumar@gmail.com',
};

const sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
    });
}

const sendleaveApplicationNotificationMail = async (leave) => {
    let managers = await User.find({roles: 'Manager'});
    let managerEmails = managers.map(manager => manager.email);
    try {
        let gmailOptions = {
            ...mailOptions,
            to: managerEmails,
            subject: 'Leave Application Notification',
            html: leaveNotification(leave),
        }
        sendMail(gmailOptions);
    } catch (err) {
        console.log(err);
    }
}

const sendleaveProcessedNotificationMail = (leave) => {
    let leaveApproved = (leave?.status === 'Approved');
    const status = leaveApproved?'Approval': 'Rejection';
    try {
        let gmailOptions = {
            ...mailOptions,
            to: leave.email,
            subject: `Leave ${status} Notification`,
            html: leaveProcessed(leaveApproved, leave),
        }
        sendMail(gmailOptions);
    } catch (err) {
        console.log(err);
    }
}

const sendNewUserNotificationMail = (name, email) => {
    try {
        let gmailOptions = {
            ...mailOptions,
            to: email,
            subject: "Leave Management Tool Access",
            html: newUserAdded(name, email),
        }
        sendMail(gmailOptions);
    } catch (err) {
        console.log(err);
    }
}



module.exports = {
    sendleaveApplicationNotificationMail,
    sendleaveProcessedNotificationMail,
    sendNewUserNotificationMail
}