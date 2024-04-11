import express from 'express'
import { loginCustomer, createNewCustomer, updateCustomerById } from '../controllers/authControllers.js'

const authRouter = express()

authRouter.post('/login',  loginCustomer)

authRouter.post('/signup', createNewCustomer);

authRouter.post('/edit_customer', updateCustomerById);


export default authRouter