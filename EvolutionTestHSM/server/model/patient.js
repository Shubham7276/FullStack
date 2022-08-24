const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({

    patientname:{
        type:String,
        required: true
    },
    mobileNo:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required: true
    },
    diseases:{
        type:String,
        required: true
    },
    medicines:{
        type:String,
        required: true
    },
    condiation:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model("Patient",PatientSchema)