const reportModel = require("../models/report")
const createReport = async (req, res) => {
    try {
        // 22.288538130810007 73.36282475774387 wagodia's
        const { latitude, longtitude } = req.body
        const user_id = 1
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longtitude}`;
        const address = await fetch(url, {
            headers: {
                'User-Agent': 'JaswanthSudha (jaswanthsudha2021@gmail.com)'
            }
        })
        const addressjson = await address.json()
        const report = await reportModel.create({ value: "Not Malnutrioned", address: addressjson.address.county, user_id })
        res.status(200).json(report)

    }
    catch (error) {

        res.status(500).json(error)
    }
}
const getReports = async (req, res) => {
    try {
        const reports = await reportModel.find({});
        res.status(200).json(reports)
    }
    catch (error) {
        res.status(500).json(error)
    }

}
const deleteReport = async (req, res) => {
    try {
        const response = await reportModel.deleteMany({});
        res.status(200).json(response)
    }
    catch (error) {
        res.status(500).json(error)
    }
}
module.exports = { createReport, getReports, deleteReport }