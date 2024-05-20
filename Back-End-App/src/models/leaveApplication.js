const mongoose = require('mongoose');

const leaveApplicationSchema = new mongoose.Schema({
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
    type:{
        type: String,
        enum: ["Sick", "Casual"],
        required: true
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
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
})

module.exports = mongoose.model("LeaveApplications", leaveApplicationSchema, "LeaveApplications")