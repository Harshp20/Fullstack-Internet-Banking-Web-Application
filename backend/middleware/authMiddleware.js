import asyncHandler from "express-async-handler";
import jwt from 'jsonwebtoken'
import { Customer } from '../models/customerModel.js'

const authRequired = asyncHandler(async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0].includes('Bearer')) {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      res.status(401)
      throw new Error('Unauthorized')
    }
    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    
    try {
      let user = await Customer.findById(decodedToken.id).select('-password')
      if (!user) {
        res.status(404)
        throw new Error('User doesn\'t exist')
      }

      req.user = user
      next()
    } catch (err) {
      throw new Error(err)
    }
  } else {
    res.status(401)
    throw new Error('Unauthorized')
  }
})

export default authRequired