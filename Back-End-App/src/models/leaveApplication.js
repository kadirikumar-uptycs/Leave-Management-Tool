const mongoose = require('mongoose');

const leaveApplicationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    shift: {
        type: String,
        enum: ["IND", "US"],
        required: true
    },
    profileImage: {
        type: String
    },
    reportedTo: {
        type: String,
        required: true,
        enum: ["Sri Rajasekaran", "Kiran Wali"]
    },
    type: {
        type: String,
        enum: ["Sick", "Casual"],
        required: true
    },
    from: {
        type: String,
        required: true
    },
    fromType: {
        type: String,
        required: true,
        enum: ["Full", "Half"]
    },
    to: {
        type: String,
        required: true
    },
    toType: {
        type: String,
        required: true,
        enum: ["Full", "Half"]
    },
    noOfDays: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Rejected", "Pending", "Approved"],
        required: true
    }
},
    {
        timestamps: true,
        collection: 'LeaveApplications'
    })

module.exports = mongoose.model("LeaveApplications", leaveApplicationSchema, "LeaveApplications")