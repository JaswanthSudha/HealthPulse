require("dotenv").config()
const { render } = require("ejs")
const express = require("express")
const app = express()
const multer = require("multer")
const path = require("path")
const PORT = 8000
const mongoose = require("mongoose")
const reportRoutes = require("./routes/report")

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.use(express.json())
app.use("/api/report", reportRoutes)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./uploads"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
})
const upload = multer({ storage })
app.use(express.urlencoded({ extended: false }))
app.get("/", (req, res) => {
    return res.render("homepage")
})
app.post("/upload", upload.single('profileImage'), async (req, res) => {
    // console.log(req.body)
    // console.log(req.file);
    try {
        const response = await fetch("http://127.0.0.1:5000/getReport", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
            , body: JSON.stringify({ "location": req.file.path })
        })
        const json = await response.json()
        // console.log(json.report)e
        // req.value = json.report;
        const reportCreated = await fetch("http://localhost:8000/api/report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ value: json.report })
        })
        // console.log(reportCreated);

        // res.status(200).json(json)
        // console.log("FlaskResponse", json)
        return res.redirect("/")
    }
    catch (error) {
        console.log(error)
        return res.redirect("/")
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
