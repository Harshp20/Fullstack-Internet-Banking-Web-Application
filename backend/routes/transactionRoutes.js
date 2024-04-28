import express from 'express'
import { transferFunds } from '../controllers/transationController.js'
import authRequired from '../middleware/authMiddleware.js'

export const transactioRouter = express.Router()

transactioRouter.put('/transfer', authRequired, transferFunds)