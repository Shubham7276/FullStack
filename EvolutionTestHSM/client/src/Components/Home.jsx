import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import InputLabel from '@mui/material/InputLabel';

import axios from 'axios';
import { AddPatient, DeletePatient, GetAllPatient, GetDiseases, GetPatientById, UpdateDetailes } from '../Services/Api';

import { DataGrid } from '@mui/x-data-grid';
import {CSVLink} from 'react-csv'
import "./login.css"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import CancelIcon from '@mui/icons-material/Cancel';

const initialValues={
  patientname: "", 
  mobileNo: "" ,
  address:"",
  diseases:"",
  medicines:"",
  condiation:"" 
}

const validationSchema=Yup.object({
  patientname:Yup.string().required("Required").min(3,"User Name must be Greter than 3 Charecter"),
  mobileNo:Yup.string().required("Required").matches(/^[0-9]{10}$/,"Enter Valid Mobile Number"),
  address:Yup.string().required("Required"),
  diseases:Yup.string().required("Required"),
  medicines:Yup.string().required("Required"),
  condiation:Yup.string().required("Required")
})

const Home = () => {
  const [open, setOpen] = useState(false);
  const [Uopen, setUopen] = useState(false);
  const [allpatient, setAllPatient] = useState([]);
  const [update, setUpdate] = useState([]);
  const [diseases, setDiseases] = useState([])




    const {_id} = update
    

    const columns = [
      { field: '_id', headerName: '_id', hide:true},

      { field: 'patientname', headerName: 'Patient Name', width: 150,  },
      { field: 'mobileNo', headerName: 'Contact No', width: 150,  },
      { field: 'address', headerName: 'Address', width: 150,  },
      { field: 'diseases', headerName: 'Diseases', width: 150,  },
      { field: 'medicines', headerName: 'Medicines', width: 150,  },
      { field: 'condiation', headerName: 'Condiation', width: 150,  },
      {
        field: 'update',
        headerName: 'Update',
        sortable: false,
        renderCell: (params) => {
          return <Button onClick={()=>clickOnPatient(params.id)} variant="contained"><ModeEditIcon/></Button>;
        },
      },
      {
        field: 'delete',
        headerName: 'Delete',
        sortable: false,
        renderCell: (params) => {
          return <Button variant="contained" onClick={()=>onclickDelete(params.id)} color='error'><DeleteIcon/></Button>;
        },
      },
      
    ];


      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
        setUopen(false)
        
    
      };

      // Add Patient
      const handleSubmit = async(values)=>{
        try {
  
          const res = await AddPatient(values)
          window.location.reload();

        } catch (error) {
          console.log(error);
        }
      }

      // Fatch All patient

      useEffect(() => {
        const getAllPatient =async()=>{

          try {
            const res = await GetAllPatient()
            setAllPatient(res.data)
            
          } catch (error) {
            console.log(error);
          }
          
        }
        getAllPatient();

        
      }, [update])

      
// get patient by id

      const clickOnPatient = async(id)=>{

          try {
            const res = await GetPatientById(id)
            console.log(res.data);
            setUpdate(res.data)
            setUopen(true)
          } catch (error) {
            console.log(error);
          }
          
        
      }

      // update patient

      const clickUpdate = async (values)=>{
        try { 
          const res = await UpdateDetailes(_id,values);
          console.log(res.data);
          
          setOpen(false);
         console.log(res.data);
         window.location.reload()
  
      } catch (error) {
        console.log(error);
      }
      }


      //delet Patient 

      const onclickDelete = async(id)=>{
        try {
          const res = await DeletePatient(id)
          console.log(res)
          window.location.reload()
        } catch (error) {
          console.log(error);
        }
      }


      const getDiseases = async () =>{
        try {
          const res = await GetDiseases()
          console.log(res.data)
          setDiseases(res.data)
        } catch (error) {
          console.log(error);
        }
      }

      // logout
      const logout =()=>{
        localStorage.removeItem("Docid");
        localStorage.removeItem("patientID");
		    window.location="/";
      }

      const ExportData =[
      
        { label: "Patient Name", key: "patientname" },
        { label: "Contact No", key: "mobileNo" },
        { label: "Address", key: "address" },
        { label: "Doctor name", key: "doctorName" },
        { label: "diseases", key: "diseases" },
        { label: "Medicenes", key: "medicines" },
        { label: "Condition", key: "condiation" },
    
    ]
      
      

  return (
    <div>
      <div className='buttons'>
      <Button variant="contained"  onClick={handleClickOpen}>
        Add Patient
      </Button>
      <CSVLink data={allpatient} headers={ExportData}><Button variant="contained" color='success'>Export data to excel</Button></CSVLink>
      <Button variant="contained" onClick={logout}  color='error'>Logout</Button>
      </div>
      <Dialog  open={open} onClose={handleClose} >
        <DialogTitle>Add New Patient</DialogTitle>
        <DialogContent sx={{width:"400px"}}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
          <Form className="card-body cardbody-color p-lg-3">
          <div className="mb-3">
          <Field 
                type="text"  
                className="form-control" 
                name="patientname" 
                placeholder="Patient Name"
                />
          <div className="errorMsg">
              <ErrorMessage name='patientname'/>
          </div>
          </div>

          <div className="mb-3">
          <Field 
                type="text"  
                className="form-control" 
                name="mobileNo" 
                placeholder="Contact Number"
                />
            <div className="errorMsg">
                  <ErrorMessage name='mobileNo'/>
            </div>
          </div>

          <div className="mb-3">
            <Field 
                  type="text"  
                  className="form-control" 
                  name="address" 
                  placeholder="Address"
                  />
            <div className="errorMsg">
                <ErrorMessage name='address'/>

            </div>
          </div>



        
          <div className="mb-3">
          <InputLabel id="demo-simple-select-helper-label">Diseases</InputLabel>
          <Field onClick={()=>getDiseases()} className="form-control" as="select" name="diseases">
             {diseases && diseases.map((d)=>(
               
             <option key={d._id} value={d.diseases}>{d.diseases}</option>
             ))}

            
           </Field>
          <div className="errorMsg">
              <ErrorMessage name='diseases'/>
          </div>
          </div>

          <div className="mb-3">
          <InputLabel id="demo-simple-select-helper-label">Medicines</InputLabel>
          <Field className="form-control" as="select" name="medicines">
             <option value="">None</option>
             <option value="Medicines 1">Medicines 1</option>
             <option value="Medicines 2">Medicines 2</option>
             <option value="Medicines 3">Medicines 3</option>
           </Field>
          <div className="errorMsg">
              <ErrorMessage name='medicines'/>
          </div>
          </div>
          <div className="mb-3">
          <InputLabel id="demo-simple-select-helper-label">Condition</InputLabel>
          <Field className="form-check-input" type="radio" name="condiation" value="Normal" />
            Normal
          <Field className="form-check-input" type="radio" name="condiation" value="Abnormal" />
          Abnormal
          </div>

          <div className="errorMsg">
              <ErrorMessage name='condiation'/>
          </div>
          <Button variant="contained" type='submit' color='success' onClick={handleSubmit}><HowToRegIcon/>Save</Button>
          <Button variant="contained" color='error' onClick={handleClose}><CancelIcon/>Cancel</Button>
          </Form>

          </Formik>
         
        </DialogContent>
        
      </Dialog>


      


      <div style={{ height: 604, width: '100%' }}>
      <DataGrid
        rows={allpatient}
        columns={columns}
        pageSize={5}
        getRowId ={(row) => row._id}
        rowsPerPageOptions={[5]}
        
        />
    </div>
        {/* Update popup */}

    <Dialog  open={Uopen} >
        <DialogTitle>Update Record</DialogTitle>

        <DialogContent sx={{width:"400px"}}>
          <Formik
            initialValues={{
              patientname: update.patientname, 
              mobileNo: update.mobileNo ,
              address:update.address,
              diseases: update.diseases,
              medicines:update.medicines,
              condiation:update.condiation
            }}
            validationSchema={validationSchema}
            onSubmit={clickUpdate}
          >
          <Form className="card-body cardbody-color p-lg-3">
          <div className="mb-3">
          <Field 
                type="text"  
                className="form-control" 
                name="patientname"
                disabled={true}
                placeholder="Patient Name"
                />
          </div>

          <div className="mb-3">
          <Field 
                type="text"  
                className="form-control" 
                name="mobileNo"
                disabled={true} 
                placeholder="Contact Number"
                />
          </div>

          <div className="mb-3">
          <Field 
                type="text"  
                className="form-control" 
                name="address"
                disabled={true} 
                placeholder="Address"
                />
          </div>


        
          <div className="mb-3">
          <InputLabel id="demo-simple-select-helper-label">Diseases</InputLabel>
          <Field className="form-control" as="select" name="diseases">
             <option value="">None</option>
             <option value="Diseases 1">Diseases 1</option>
             <option value="Diseases 2">Diseases 2</option>
             <option value="Disease 3">Disease 3</option>
           </Field>
          <div className="errorMsg">
              <ErrorMessage name='diseases'/>
          </div>
          </div>

          <div className="mb-3">
          <InputLabel id="demo-simple-select-helper-label">Medicines</InputLabel>
          <Field className="form-control" as="select" name="medicines">
            
             <option value="">None</option>
             <option value="Medicines 1">Medicines 1</option>
             <option value="Medicines 2">Medicines 2</option>
             <option value="Medicines 3">Medicines 3</option>
           </Field>
          <div className="errorMsg">
              <ErrorMessage name='medicines'/>
          </div>
          </div>
          <div className="mb-3">

          <Field className="form-check-input" type="radio" name="condiation" value="Normal" />
            Normal
          <Field className="form-check-input" type="radio" name="condiation" value="Abnormal" />
          Abnormal
          </div>

          <div className="errorMsg">
              <ErrorMessage name='condiation'/>
          </div>
          <Button variant="contained" type='submit' color='success'><HowToRegIcon/>Save</Button>
          <Button variant="contained" color='error' onClick={handleClose}><CancelIcon/>Cancel</Button>
          </Form>

          </Formik>
         
        </DialogContent>



        
      </Dialog>
    </div>
  )
}

export default Home