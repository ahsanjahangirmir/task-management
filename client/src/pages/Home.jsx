import LogoutButton from "@/components/LogoutButton"
import TaskList from "@/components/TaskList"
import TaskModal from "@/components/TaskModal"

export default function Home() 
{
    return (
        
        <div className="p-4">
        
            <div className="flex items-center mb-4">
                <h1 className="text-xl font-bold">Smart Task Manager</h1>
                <LogoutButton/>
            </div>
            
            <TaskList/>
            <TaskModal/>
        
        </div>

    )
}
