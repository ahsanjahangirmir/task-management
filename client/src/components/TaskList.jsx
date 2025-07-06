import { useTasks, useToggleTask, useDeleteTask } from '@/hooks/useTasks'
import { useModalStore } from '@/stores/modalStore'
import { useUIStore } from '@/stores/uiStore'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

export default function TaskList() {
  const { data: tasks = [], isLoading, error } = useTasks()
  const openModal = useModalStore((s) => s.openModal)
  const toggleTask = useToggleTask()
  const deleteTask = useDeleteTask()
  const filter = useUIStore((s) => s.filter)
  const setFilter = useUIStore((s) => s.setFilter)

  if (isLoading) return <p>Loading tasks…</p>
  if (error) return <p>Error: {error.message}</p>

  const filtered = tasks.filter(t =>
    filter === 'all' ? true : filter === 'completed' ? t.is_done : !t.is_done
  )

  return (
    <>
    <div className="flex items-center space-x-2 mb-4">
  <Button size="sm" onClick={() => openModal(null)}>➕ New Task</Button>
  {['all', 'active', 'completed'].map(/* existing filter buttons */)}
</div>
      <div className="flex space-x-2 mb-4">
        {['all','active','completed'].map(f => (
          <Button key={f} size="sm" variant={filter===f ? 'primary':'outline'} onClick={()=>setFilter(f)}>
            {f.charAt(0).toUpperCase()+f.slice(1)}
          </Button>
        ))}
      </div>
      <ul className="space-y-2">
        {filtered.map(task => (
          <li key={task.id} className="flex items-center space-x-3">
            <Checkbox checked={task.is_done} onCheckedChange={() => toggleTask.mutate({ id: task.id, is_done: !task.is_done })} />
            <span className={task.is_done ? 'line-through' : ''}>{task.title}</span>
            <Button size="sm" variant="ghost" onClick={() => openModal(task)}>Edit</Button>
            <Button size="sm" variant="destructive" onClick={() => deleteTask.mutate(task.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </>
  )
}
