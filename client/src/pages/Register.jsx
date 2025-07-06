import { useState } from "react";
import { supabase } from "../lib/supabase";
import { AuthCard } from "@/components/AuthCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Register() 
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [displayName, setDisplayName] = useState("");

    const handleRegister = async () => 

    {
        setMessage("");

        if (password !== confirmPassword)
        {
            setMessage("Passwords do not match!");
            return;
        }
        setLoading(true);

        const {data, error} = await supabase.auth.signUp({email, password, options: { data: { displayName } } });

        setLoading(false);
    
        if (error)
        
        {
            setMessage(error.message)
        } 
        
        else 
        
        {
            setMessage("Check your inbox to confirm your email.")
        }
    }

    return (
        
        <AuthCard title="Create Account">

        <div className="space-y-4">

            <div>
                <Label>Email</Label>
                <Input value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div>
                <Label>Display Name</Label>
                <Input value={displayName} onChange={e => setDisplayName(e.target.value)} />
            </div>

            <div>
                <Label>Password</Label>
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            <div>
                <Label>Confirm Password</Label>
                <Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            </div>

            <Button className="w-full" onClick={handleRegister} disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </Button>
            
            {message && <p className="text-sm text-muted-foreground">{message}</p>}

        </div>

        </AuthCard>
    )
}   