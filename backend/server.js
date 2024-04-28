import express from 'express'
import customerRouter from './routes/customerRoutes.js'
import authRouter from './routes/authRoutes.js'
import cors from 'cors'
import colors from 'colors'
import dotenv from 'dotenv'
import { dbConnection } from './config/dbConfig.js'
import { transactioRouter } from './routes/transactionRoutes.js'
dotenv.config()
dbConnection()

const app = express()

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/banking', customerRouter)
app.use('/api/banking/transaction', transactioRouter)
app.use('/auth', authRouter)

app.listen(port, () => console.log(`Server listening for requests on PORT: ${port}`.cyan.underline))