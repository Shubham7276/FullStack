import axios from "axios";
import { User, ChatMessage ,Members } from "../Interfaces/Interface";

const baseURL = "http://localhost:8080/api";

// login logout

export const SignUpUser = async (data:User) =>{
    return await axios.post(`${baseURL}/auth/signup`,data)
} 

export const LoginUser = async (data:User) =>{
    return await axios.post(`${baseURL}/auth/login`,data)
}

// user

export const GetUser = async (friendId:String | undefined)=>{
    return await axios.get(`${baseURL}/user/${friendId}`)
}

export const GetAllUsers = async ()=>{
    return await axios.get(`${baseURL}/user/users/all`)
}

export const GetUserById = async(userId:String | null)=>{
    return await axios.get(`${baseURL}/user/${userId}`)
}

export const UpdateUser = async(id:String | null,updateData:User)=>{
    return await axios.put(`${baseURL}/user/${id}`,updateData)
}


// Conversation

export const GetAllConversation = async(_id:String | null) =>{
    return await axios.get(`${baseURL}/conversation/${_id}`)
}

export const AddNewConversation = async(members:Members)=>{
    return await axios.post(`${baseURL}/conversation`,members)
}

export const DeleteConversation = async(conversationId:String | undefined) =>{
    return await axios.delete(`${baseURL}/conversation/${conversationId}`)
}

// Messages

export const GetAllMessage = async(currentChatId:String | undefined)=>{
    return await axios.get(`${baseURL}/message/${currentChatId}`)
}

export const AddNewMessage = async(message:ChatMessage)=>{
    return await axios.post(`${baseURL}/message`,message)
}

export const DeleteMessage = async(currentChatId:String | undefined)=>{
    return await axios.delete(`${baseURL}/message/${currentChatId}`)
}



