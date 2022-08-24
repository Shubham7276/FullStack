import axios from "axios";

const baseURL = "http://localhost:8080"


//Login
export const LoginDoc = async(value)=>{
    return await axios.post(`${baseURL}/doctor/login`,value)
}

export const LoginPatient = async(value)=>{
    return await axios.post(`${baseURL}/patient/login`,value)
}


// Patient Crud

export const AddPatient = async(values)=>{
    return await axios.post(`${baseURL}/patient`,values)
}

export const GetPatient = async(PatientId) =>{
    return await axios.get(`${baseURL}/patient/${PatientId}`)
}

export const GetAllPatient = async()=>{
    return await axios.get(`${baseURL}/patient`)
}

export const GetPatientById = async(id)=>{
    return await axios.get(`${baseURL}/patient/${id}`)
}

export const UpdateDetailes = async(id,updateData)=>{
    return await axios.put(`${baseURL}/patient/${id}`,updateData)
}

export const DeletePatient = async(id)=>{
    return await axios.delete(`${baseURL}/patient/${id}`)
}


// disease

export const GetDiseases = async()=>{
    return await axios.get(`${baseURL}/diseases`)
}
