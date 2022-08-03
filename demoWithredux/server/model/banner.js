
const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema(
  {
    title :{
        type:String
    },
    color :{
        type:String
    },
    description :{
        type:String
    },
    location :{
        type:String
    },
   
  }
  
);

module.exports = mongoose.model("Banner", BannerSchema);