import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { AuthCard } from "@/components/AuthCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function ForgotPassword() 
{
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const handleReset = async () => 
    {
        const { error } = await supabase.auth.resetPasswordForEmail(email)
        
        if (error) 
        
        {
            setMessage(error.message)
        } 
        
        else 
        
        {
            setMessage("Check your inbox to reset your password.")
        }
    }

    return (

        <AuthCard title="Reset Password">
        
        <div className="space-y-4">
        
            <div>
                <Label>Email</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
        
            <Button className="w-full" onClick={handleReset}>Send Reset Link</Button>
        
            {message && <p className="text-sm text-muted-foreground">{message}</p>}
        
        </div>
        
        </AuthCard>
    )
}
