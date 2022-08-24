const express = require("express")
const cors = require("cors")
const connection = require("./db")
const DoctorRouth = require("./routes/doctor")
const PatientRouth = require("./routes/patient")
const DiseasesRouth = require("./routes/diseases")

connection()

const app = express()

app.use(express.json())
app.use(cors())

app.use("/doctor",DoctorRouth)
app.use("/patient",PatientRouth)
app.use("/diseases",DiseasesRouth)


const port = 8080;
app.listen(port, console.log(`Listening on port ${port}...`));