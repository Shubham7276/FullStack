const mongoose = require('mongoose');

const MedicinesSchema = new mongoose.Schema({
    medicines:{
        type:String,
        required: true
    },
    diseases:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model("Medicines",MedicinesSchema)