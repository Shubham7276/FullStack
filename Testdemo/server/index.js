const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const bannerRouth = require("./routes/banner")

connection();
app.use(express.json());
app.use(cors())
app.use("/banner",bannerRouth)

const port =8080 ;
app.listen(port, console.log(`Listening on port ${port}...`));





























