import { createContext, useContext, useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

const SessionContext = createContext({ session: null, user: null })

export function SessionProvider({ children }) 
{
    const [session, setSession] = useState(null)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => 
    
    {
        supabase.auth.getSession().then(({ data: { session } }) => 
        {
            setSession(session)
            setUser(session?.user ?? null)
            setLoading(false)
        })

        const { data: sub } = supabase.auth.onAuthStateChange((_, s) => 
        {
            setSession(s)
            setUser(s?.user ?? null)
        })

        return () => sub.subscription.unsubscribe()
    
    }, [])

    if (loading) 
    {
        return <div className="p-4">Loading…</div>
    }

    return (
        <SessionContext.Provider value={{ session, user }}>
            {children}
        </SessionContext.Provider>
    )
}

export const useSession = () => 
{
    const context = useContext(SessionContext)
    if (!context) throw new Error("useSession should be  inside SessionProvider")
    return context
}
