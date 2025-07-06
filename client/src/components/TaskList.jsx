import { useTasks } from '@/hooks/useTasks'
import { useUIStore } from '@/stores/uiStore'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

export default function TaskList() 
{
    const { data: tasks, isLoading, error } = useTasks()
    const setEditingTaskId = useUIStore(s => s.setEditingTaskId)

    if (isLoading) return <p>Loading tasks…</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <ul className="space-y-2">
        
            {tasks.map(task => (
                
                <li key={task.id} className="flex items-center space-x-3">
                
                    <Checkbox
                        checked={task.is_done}
                        onCheckedChange={() => {/* TODO: toggle via Supabase mutation */}}
                    />
                    
                    <span className={task.is_done ? 'line-through' : ''}>{task.title}</span>
                    
                    <Button size="sm" variant="ghost" onClick={() => setEditingTaskId(task.id)}>
                        Edit
                    </Button>
                    
                </li>
            ))}
            
        </ul>
    )
}
