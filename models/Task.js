const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    check: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Task", taskSchema);
