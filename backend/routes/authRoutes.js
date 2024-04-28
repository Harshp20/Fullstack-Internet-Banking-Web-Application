import express from 'express'
import { loginCustomer, createNewCustomer } from '../controllers/authControllers.js'
import { updateCustomerById } from '../controllers/customerControllers.js'
import authRequired from '../middleware/authMiddleware.js'

const authRouter = express()

authRouter.post('/login', loginCustomer)

authRouter.post('/signup', createNewCustomer);

authRouter.post('/edit_customer', authRequired, updateCustomerById);


export default authRouter