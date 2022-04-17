const mongoose = require('mongoose');
const url="mongodb://localhost:27017/MEANCrudDB";

mongoose.connect(url,(err,db)=>{
    if(err)throw err;
    console.log("Database Connection Succeeded..!!");
});

module.exports=mongoose;