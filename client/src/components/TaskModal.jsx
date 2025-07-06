import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { useModalStore } from '@/stores/modalStore'
import { useQueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { useSession } from '@/context/SessionContext'

export default function TaskModal() {
  const { isOpen, taskToEdit, closeModal } = useModalStore()
  const { user } = useSession()       
  const [title, setTitle] = useState('')
  const [deadline, setDeadline] = useState('')
  const qc = useQueryClient()

  const create = useMutation({
    mutationFn: (newTask) => supabase.from('tasks').insert([newTask]),
    onSettled: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
  })
  const update = useMutation({
    mutationFn: ({ id, ...fields }) => supabase.from('tasks').update(fields).eq('id', id),
    onSettled: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
  })

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || '')
      setDeadline(taskToEdit.deadline?.slice(0,16) || '')
    } else {
      setTitle('')
      setDeadline('')
    }
  }, [taskToEdit])

   const handleSubmit = () => {
    const payload = {          
      title,
      deadline: deadline || null,
      user_id: user.id,        
      is_done: false,
    }
     if (taskToEdit) update.mutate({ id: taskToEdit.id, ...payload })
     else            create.mutate(payload)
     closeModal()
   }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{taskToEdit ? 'Edit Task' : 'New Task'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div>
            <Label>Deadline</Label>
            <Input type="datetime-local" value={deadline} onChange={e => setDeadline(e.target.value)} />
          </div>
          <Button className="w-full" onClick={handleSubmit}>{taskToEdit ? 'Save' : 'Create'}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
