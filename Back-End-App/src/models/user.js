const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    shift: {
        type: String,
        enum: ["IND", "US"],
        required: true
    },
    profileImage: {
        type: String
    },
    accessLevel: {
        type: String,
        default: 'User'
    }
},
{
    timestamps: true,
    collection: 'Users'
})

module.exports = mongoose.model("User", userSchema, 'User');