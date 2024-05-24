const patientModel = require("../models/patient")
const reportModel = require("../models/report")
const createPatient = async (req, res) => {
    try {
        const { name, phone, abha, priority } = req.body
        const report = await reportModel.find({ user_id: req.body.user_id })
        const diagnosis = report.value
        const patient = await patientModel.create({ name, phone, abha, priority, diagnosis })
        res.status(200).json(patient)
    }
    catch (error) {
        res.status(500).json(error)
    }

}
const getPatients = async (req, res) => {
    try {
        const patients = await patientModel.find({})
        res.status(200).json(patients)
    }
    catch (error) { }
}
module.exports = { createPatient, getPatients }