import express from 'express';

import bodyParser from "body-parser";
import mongoose from "mongoose"; 
import cors from 'cors';
import Router from './server/route.js';



const app = express();

app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
app.use('/users',Router)


const URL = "mongodb://localhost:27017/MERNCrudDB"
const PORT= '8080'

mongoose.connect(URL,{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify:true}).then(()=>{
    app.listen(PORT,()=> console.log(`start port ${PORT}`))
}).catch((error)=>{
    console.log('Error: ',error.message);
})

