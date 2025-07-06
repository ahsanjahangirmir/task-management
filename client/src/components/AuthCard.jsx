import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function AuthCard({title, children}) 
{
    return (
        <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md shadow-xl">
            <CardHeader>
            <CardTitle className="text-center text-2xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
            {children}
            </CardContent>
        </Card>
        </div>
    )
}