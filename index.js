require("dotenv").config()
const express = require("express")
const app = express()
const multer = require("multer")
const path = require("path")
const PORT = 8000
const cors = require("cors")
const mongoose = require("mongoose")
const reportRoutes = require("./routes/report")
const reportModel = require("./models/report")
const { createReport } = require("./controllers/report")
app.use(cors())
app.use(express.json())
app.use("/api/report", reportRoutes)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
})
const upload = multer({ storage })
app.use(express.urlencoded({ extended: false }))
app.get("/", (req, res) => {
    res.json("homepage")
})
app.post("/upload", upload.single('profileImage'), async (req, res) => {

    try {
        await createReport(req, res)
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})
mongoose.connect(process.env.STRING)
    .then(() => {
        console.log("Database Loaded")
        app.listen(PORT, () => console.log("Server"))

    })
    .catch((error) => {
        console.log(error)

    })