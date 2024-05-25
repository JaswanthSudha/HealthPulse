require("dotenv").config()
const multer = require("multer")
const express = require("express")
const reportRoutes = require("./routes/report")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const path = require("path")
const cors = require('cors')
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
        console.log(req.file);
        if (req.file) {
            await createReport(req, res)
        }
        else {
            throw new Error("File Not Uploaded Successfully")
        }
    }
    catch (error) {
        res.json(error)
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
