import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'counter',
  initialState: {
     userData:null 
  },
  reducers: {
      setUserData:(state,action)=>{
        state.userdata =action.payload
      }
    
    }
  }
)

// Action creators are generated for each case reducer function
export const { setUserData } = userSlice.actions

export default userSlice.reducer