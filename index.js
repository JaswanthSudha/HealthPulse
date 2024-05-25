require("dotenv").config()
const multer = require("multer")
const express = require("express")
const reportRoutes = require("./routes/report")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const path = require("path")
const cors = require('cors')
const reportModel = require("./models/report")
const { createReport } = require("./controllers/report")
app.use(cors())
app.use(express.json())
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/api/report", reportRoutes)
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({ storage: storage })
app.post("/upload", upload.single("profile"), async (req, res) => {
    try {
        if (req.file) {
            console.log(req.file);
            const { longtitude, latitude } = req.body
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longtitude}`;
            const address = await fetch(url, {
                headers: {
                    'User-Agent': 'JaswanthSudha (jaswanthsudha2021@gmail.com)'
                }
            })
            if (!address) {
                throw new Error("Address Not Found")
            }
            const addressjson = await address.json()
            console.log(addressjson);
            const report = await reportModel.create({ value: "Not Malnutrioned", address: addressjson.address.county, user_id: 1 })
            if (!report) {
                throw new Error("Report Not Created")
            }
            res.status(200).json(report);
        }
        else {
            throw new Error("File Not Uploaded")
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})
mongoose.connect(process.env.STRING)
    .then(() => {
        console.log("databaseConnected")
        app.listen(4000, () => {
            console.log(`listening on port ${8000}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
