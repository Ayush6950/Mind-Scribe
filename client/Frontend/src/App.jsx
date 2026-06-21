import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentUser } from './service/api'
import Pricing from './pages/Pricing'
import Notes from './pages/Notes'
import History from './pages/History'

export const serverUrl = "http://localhost:3000"
function App() {
  const dispatch = useDispatch()
  useEffect(()=>{ 
    getCurrentUser(dispatch)
   },[dispatch])
   
  const { userdata } = useSelector((state) => state.user)
  return (
    <>
    <Routes>
   <Route path ="/" element ={userdata ? <Home/> : <Navigate to = "/auth/" replace/>} />
   <Route path = '/auth' element = {userdata ?  <Navigate to ="/" replace/> : <Auth/> } />
   <Route path = '/history' element = {userdata ? <History/> : <Navigate to ="/auth" replace/> } />
   <Route path = '/notes' element = {userdata ? <Notes/> : <Navigate to ="/auth" replace/> } />
   <Route path = '/pricing' element = {userdata ? <Pricing/> : <Navigate to ="/auth" replace/> } />
  

   <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  )
} 

export default App;

