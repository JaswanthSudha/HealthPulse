require("dotenv").config()
const express = require("express")
const app = express()
const multer = require("multer")
const path = require("path")
const PORT = 8000
const cors = require("cors")
const mongoose = require("mongoose")
const reportRoutes = require("./routes/report")
const { createReport } = require("./controllers/report")
app.use(cors())
app.use(express.json())
app.use("/api/report", reportRoutes)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./uploads"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
})
const upload = multer({ storage })
app.use(express.urlencoded({ extended: false }))
app.get("/", (req, res) => {
    res.json("homepage")
})
app.post("/upload", upload.single('profileImage'), createReport)

// console.log(req.body)
// console.log(req.file);
// try {
// ml model api
// const response = await fetch("http://127.0.0.1:5000/getReport", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     }
//     , body: JSON.stringify({ "location": req.file.path })
// })
// const json = await response.json()
// console.log(json.report)e
// req.value = json.report;
//         const reportCreated = await fetch("http://localhost:8000/api/report", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",

//             },
//             body: JSON.stringify({ value: "Not Malnutrioned", longtitude: req.body.longtitude, latitude: req.body.latitude, })
//         })
//         res.status(200).json(reportCreated);
//     }
//     catch (error) {
//         res.status(500).json(error)
//     }
// })
mongoose.connect(process.env.STRING)
    .then(() => {
        console.log("Database Loaded")
        app.listen(PORT, () => console.log("Server"))

    })
    .catch((error) => {
        console.log(error)

    })