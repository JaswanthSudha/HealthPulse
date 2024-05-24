const mongoose = require("mongoose")
const reportSchema = new mongoose.Schema({
    value: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    user_id: {
        type: String,
        require: true
    }

}, { timestamps: true })
module.exports = mongoose.model("Report", reportSchema)