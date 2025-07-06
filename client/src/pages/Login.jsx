import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { AuthCard } from "@/components/AuthCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function Login() 
{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleLogin = async () => 
    {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
    
        if (error) 
        
        {
            setMessage(error.message)
        } 
        
        else 
        
        {
            setMessage("Login successful")
            window.location.href = "/"
        }
    }

  return (

    <AuthCard title="Login">
    
        <div className="space-y-4">
    
        <div>
          <Label>Email</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
    
        <div>
          <Label>Password</Label>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
    
        <Button className="w-full" onClick={handleLogin}>Login</Button>
    
        {message && <p className="text-sm text-muted-foreground">{message}</p>}
    
        </div>
    
    </AuthCard>
  )
}
