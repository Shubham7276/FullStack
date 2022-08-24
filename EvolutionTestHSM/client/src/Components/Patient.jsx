import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Button from '@mui/material/Button';
import patient from '../image/with.png'
import { GetPatient } from '../Services/Api';


const Patient = () => {

    const [patientdetails, setPatientDetails] = useState([]);
    const PatientId = localStorage.getItem("patientID")

    

    useEffect(() => {
        const getPatientDetails =async()=>{

          try {
            const res = await GetPatient(PatientId)
            setPatientDetails(res.data)
            console.log(res.data)
          } catch (error) {
            console.log(error);
          }
          
        }
        getPatientDetails();

      }, [])

      console.log(patientdetails)

      const logout =()=>{
        localStorage.removeItem("patientID");
        localStorage.removeItem("Docid");
		    window.location="/";
      }

  return (
    <div>
      <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h2 className="text-center text-dark mt-5">Patient Details</h2>
       
        <div className="card my-4">

          <form className="card-body cardbody-color p-lg-5">

            <div className="text-center">
              <img src={patient} className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px" alt="profile"/>
            </div>

            <div className="mb-3">
            Patient Name :- {patientdetails.patientname}
            </div>
            <div className="mb-3">
            Patient Diseases :- {patientdetails.diseases}
            </div>
            <div className="mb-3">
            Patient Medicines :- {patientdetails.medicines}
            </div>
            <div className="mb-3">
            Patient Condition :- {patientdetails.condiation}
            </div>
            <div className="text-center"><button type="button" onClick={logout} className="btn btn-color px-5 mb-5 w-100">Logout</button></div>
            
          </form>
        </div>

      </div>
    </div>
  </div>
    </div>
  )
}

export default Patient