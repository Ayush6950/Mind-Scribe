import { Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'

export const serverUrl = "http://localhost:3000"
function App() {
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

