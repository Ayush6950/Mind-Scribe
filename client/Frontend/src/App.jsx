import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import { useEffect } from 'react'
import { getCurrentUser } from '../../../server/controllers/user.controllers'

export const serverUrl = "http://localhost:3000"
function App() {
  const dispatch = dispatch()
  useEffect(()=>{ 
    getCurrentUser()
   },[])
  return (
    <>
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/Auth" element={<Auth />} />
      <Route path="/Home" element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  )
} 

export default App

