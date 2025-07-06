import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { useNavigate } from "react-router-dom"

export default function LogoutButton() 
{
    const nav = useNavigate()

    const handleLogout = async () => 
    
    {
        await supabase.auth.signOut()
        nav("/login", { replace: true })
    }

    return (
        <Button variant="outline" onClick={handleLogout} className="ml-auto">
            Log Out
        </Button>
    )
}