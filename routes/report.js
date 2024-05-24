const express = require("express")
const router = express.Router()
const { getReports, deleteReport, createReport } = require("../controllers/report")
router.post("/", createReport)
router.get("/", getReports)
router.delete("/", deleteReport)
module.exports = router;