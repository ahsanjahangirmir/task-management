import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "@/pages/Register"
import Login from "@/pages/Login"
import Home from "@/pages/Home"
import ForgotPassword from "@/pages/ForgotPassword"
import { SessionProvider } from "./context/SessionContext"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function App() 
{
  return (
   
    <SessionProvider>
      
      <BrowserRouter>
      
        <Routes>
    
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<ForgotPassword />} />
    
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
    
        </Routes>
      
      </BrowserRouter>
    
    </SessionProvider>  
  )
}