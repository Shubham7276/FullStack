"use strict";
exports.__esModule = true;
const mongoose = require('mongoose');
const { Constants } = require('../constant/constant');

var employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String,
        required: 'This field is required.'
    },
    mobile: {
        type: String,
        required: 'This field is required.'
    },
    city: {
        type: String,
        required: 'This field is required.'
    },
    age: {
        type: Number,
        required: 'This field is required.'
    },
    salery: {
        type: Number,
        required: 'This field is required.'
    }
});

// Custom validation for email

employeeSchema.path('email').validate((val) => {
    
    return Constants.emailRegex.test(val)
}, 'Invalid e-mail.');

//Modified
employeeSchema.path('fullName').validate((val)=>{
    
    return Constants.fullNameRegex.test(val);
}, 'Invalid Full Name...!');

employeeSchema.path('mobile').validate((val) =>{
    
    return Constants.mobileRegex.test(val);
}, 'Invalid Mobile number..!');

employeeSchema.path('city').validate((val) =>{
    
    return Constants.cityRegex.test(val);
}, 'Invalid City...!');

employeeSchema.path('age').validate((val) =>{
    
    return Constants.ageRegex.test(val);
}, 'Invalid Age..!');

employeeSchema.path('salery').validate((val) =>{
    
    return Constants.saleryRegex.test(val);
}, 'Invalid Salery...!');



mongoose.model('Employee', employeeSchema);