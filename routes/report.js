const express = require("express")
const router = express.Router()
const reportModel = require("../models/report")
router.post("/", async (req, res) => {

    try {

        const address = "Parul University Limda"
        const { value } = req.body
        const report = await reportModel.create({ value, address })
        res.status(200).json(report)

    }
    catch (error) {
        res.status(500).json(error)
    }

})
router.get("/", async (req, res) => {
    try {
        const reports = await reportModel.find({});
        res.status(200).json(reports)
    }
    catch (error) {
        res.status(500).json(error)
    }
})
router.delete("/", async (req, res) => {
    try {
        const response = await reportModel.deleteMany({});
        res.status(200).json(response)
    }
    catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router;