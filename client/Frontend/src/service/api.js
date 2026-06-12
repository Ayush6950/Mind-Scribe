import { serverUrl } from "../App"
import axios from "axios"


export  const getCurrentUser  =  async (dispatch)  => {
    try{
        const result = await axios.get(serverUrl + "/api/user/currentuser",{withCredentials:true})
        console.log(result.data)
    }catch(error){
        console.log(error)
    }   
}
