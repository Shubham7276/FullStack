const mongoose = require('mongoose');

const DiseasesSchema = new mongoose.Schema({
    diseases:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model("Diseases",DiseasesSchema)