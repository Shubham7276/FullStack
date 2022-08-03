import { CREATE , FETCH} from "./actiontypes";

import { AddBanner , GetBanner } from "../Services/api";

export const createBanner=(value)=>async (dispatch) => {

    try{
        const {data}=await AddBanner(value);
        console.log(data)
        dispatch({type:CREATE,payload:{data}})
    }catch(error){
        console.log(error);
    }
};

export const getBanner=()=>async (dispatch) => {

    try{
        const {data}=await GetBanner();
        console.log(data)
        dispatch({type:FETCH,payload:{data}})
    }catch(error){
        console.log(error);
    }
};