import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export function useTasks() 
{
    return useQuery({
        
        queryKey: ['tasks'],
        
        queryFn: async () => 
        
        {
            const { data, error } = await supabase
                .from('tasks')
                .select('*')
                .order('deadline', { ascending: true })
            
            if (error) throw error
            return data
        },
    })
}

export function useToggleTask() 
{
    const qc = useQueryClient()

    return useMutation({

        mutationFn: async ({ id, is_done }) => 
        
        {
            const { error } = await supabase
            .from('tasks')
            .update({ is_done })
            .eq('id', id)

            if (error) throw error
        },

        onMutate: async ({ id, is_done }) => 
            
        {
            await qc.cancelQueries({ queryKey: ['tasks'] })
            const prev = qc.getQueryData(['tasks'])
            qc.setQueryData(['tasks'], (old) => old.map((t) => (t.id === id ? { ...t, is_done } : t)))
         
            return { prev }
        },

        onError: (_err, _vars, ctx) => 
        
        {
            qc.setQueryData(['tasks'], ctx.prev)
        },

        onSettled: () => 
        
        {
            qc.invalidateQueries({ queryKey: ['tasks'] })
        },
    })
}

export function useDeleteTask() 
{
    const qc = useQueryClient()
    
    return useMutation({
        
        mutationFn: async (id) => 
            
        {
            const { error } = await supabase.from('tasks').delete().eq('id', id)
            if (error) throw error
        },

        onMutate: async (id) => 
            
        {
            await qc.cancelQueries({ queryKey: ['tasks'] })
            const prev = qc.getQueryData(['tasks'])
            qc.setQueryData(['tasks'], (old) => old.filter((t) => t.id !== id))
            return { prev }
        },

        onError: (_err, _id, ctx) => 
            
        {
            qc.setQueryData(['tasks'], ctx.prev)
        },

        onSettled: () => 
            
        {
            qc.invalidateQueries({ queryKey: ['tasks'] })
        },
    })
}