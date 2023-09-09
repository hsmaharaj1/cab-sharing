const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    mail: String,
    from: String,
    to: String,
    rdate: {
        type: Date,
        required: true
    },
    rtime: {
        type: Number,
        required: true
    },
    incomings: {
        type: Array,
        required: false,
        default: {}
    },
    isConnected: {
        type: Number,
        default: 0,
        required: false
    }
})

module.exports = mongoose.model('User', userSchema)