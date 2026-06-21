import { serverUrl } from "../App"
import axios from "axios"
import { setUserData } from "../../redux/userSlice"


export  const getCurrentUser  =  async (dispatch)  => {
    try{
        const result = await axios.get(serverUrl + "/api/user/currentuser",{withCredentials:true})
        console.log(result.data)
        dispatch(setUserData(result.data)) 
    }catch(error){
        console.log(error)
    }   
}

export const generateNotes = async (payload) =>{
    try {
        const result  = await axios.post(serverUrl + "/api/notes/genrate-notes",payload,{withCredentials:true})
        console.log(result.data)
        return result.data
    } catch (error) {
        console.error("generateNotes Error:", error);
        throw new Error(error.response?.data?.message || "Failed to generate notes");
    }
}