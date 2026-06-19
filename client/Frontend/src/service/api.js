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