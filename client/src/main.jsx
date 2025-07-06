import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { SessionProvider } from './context/SessionContext'
import './tailwind.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <SessionProvider>
            <App />
        </SessionProvider>
    </QueryClientProvider>
)
