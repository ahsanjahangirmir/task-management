import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import aiRouter   from './routes/ai.js'
import mailRouter from './routes/mail.js'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/ai',   aiRouter)
app.use('/mail', mailRouter)

app.use('*', (_, res) => res.status(404).json({ error: 'Not found' }))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`API listening on ${PORT}`))

export default app     // for Jest
