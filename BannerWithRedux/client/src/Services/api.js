import axios from "axios"



   const baseURL = "http://localhost:8080/banner"

   export const AddBanner = async(data) =>{
        return await axios.post(`${baseURL}`,data)
   }

   export const GetBanner = async() =>{
     return await axios.get(`${baseURL}/allbanner`)
}

   


