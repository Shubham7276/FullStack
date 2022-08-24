import React, { useState } from 'react'
import axios from "axios";
import "./login.css"
import {Formik,Form,Field,ErrorMessage} from 'formik'
import { FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import { LoginDoc, LoginPatient } from '../Services/Api';



const initialValues={
  username: "",
  password: "IamDoc",
}

const validationSchema=Yup.object({
username:Yup.string().required('user Name Requried!'),
password:Yup.string().required('Password Requried!!!'),



}) 


const Login = () => {

  const [type, setType] = useState()
  const [error, setError] = useState(""); 
  const handleSubmit = async(value)=>{
    try {

      if(type==="true"){
        const res = await LoginDoc(value)
        console.log(res.data);
        localStorage.setItem("Docid", res.data.docid);
        window.location="/home"
      }
          
      else if(type==="false"){
            const res = await LoginPatient(value)
            console.log(res)
            setError("")
            localStorage.setItem("patientID", res.data.pid);
            window.location="/patient"
      }
      
      
    } catch (error) {

      setError(error.response.data.message);
      
    }
      
  }
  

  return (
    <div className='Doctor_login'>
    
    <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3">
      <h2 className="text-center text-dark mt-5">Hospital Management System</h2>
        
        <div className="card my-5">     
            <Formik initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}>
                    <Form className="card-body cardbody-color p-lg-5">
                    <div className="mb-3">
              <Field 
                type="text"  
                className="form-control" 
                id="Username"
                name="username" 
                placeholder="User Name"
                />
            </div>
            <div className="errorMsg">
                                <ErrorMessage name='username'/>
                            </div>

            <div className="mb-3">
              <Field
                 type="password"
                 className="form-control" 
                 id="password" 
                 name="password"
                 placeholder="password"
                />
            </div>
            <div className="errorMsg">
								<ErrorMessage name='password'/>
                           
            </div>
            <h3>Select User type</h3>
            <div className="mb-3">
              
            <RadioGroup row name="type" onChange={(event)=>setType(event.target.value)}>
              
              <FormControlLabel value="true" control={<Radio />} label="Doctor" />
              <FormControlLabel value="false"  control={<Radio />} label="Patient" />
           </RadioGroup>

          
            </div>
            
            <div className="text-center"><button type="submit" className="btn btn-color px-5 mb-5 w-100">Login</button>
                {error && <div className={"error_msg"}>{error}</div>}  
            </div>
                 
            
            {/* <div id="emailHelp" className="form-text text-center mb-5 text-dark">Not
              Registered? <a href="#" className="text-dark fw-bold"> Create an
                Account</a>
            </div> */}
            </Form>
              </Formik>
          
        </div>

      </div>
    </div>
  </div>
    </div>

    
    
  )
}

export default Login