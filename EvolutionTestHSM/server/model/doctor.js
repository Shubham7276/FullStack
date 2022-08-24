const mongoose = require("mongoose");


const DoctorSchema = new mongoose.Schema({

    username:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
})


module.exports = mongoose.model("Doctor",DoctorSchema)