const mongoose = require("mongoose")
const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    abha: {
        type: Number,
        require: true
    },
    diagnosis: {
        type: Number,
        require: true
    },
    priority: {
        type: Number,
        require: true
    },
})
module.exports = mongoose.model("Patient", patientSchema)