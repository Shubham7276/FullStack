import axios from 'axios';

const userUrl = 'http://localhost:8080/users';

export const getUsers = async(id) =>{
    id = id || '';
    return await axios.get(`${userUrl}/${id}`)
}

export const addUser = async(user)=>{
    return await axios.post(`${userUrl}/add`,user);
}

export const deleteUser = async(id) =>{
    return await axios.delete(`${userUrl}/${id}`);
}

export const editUser = async(id,user)=>{
    return await axios.put(`${userUrl}/${id}`,user)
}