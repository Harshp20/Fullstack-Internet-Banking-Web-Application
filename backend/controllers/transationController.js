import asyncHandler from 'express-async-handler'
import { Customer } from '../models/customerModel.js'

export const transferFunds = asyncHandler(async (req, res) => {
  const newBalance = req.user.bankAccountBalance - req.body.amount
  if (newBalance < 0) {
    res.status(400).json({ message: 'Transaction amount greater than available balance' })
  }

  try {
    const recipientFilter = { bankAccountNo: req.body.recipientAccountNo }
    const recipient = await Customer.findOne(recipientFilter)
    
    if (!recipient) res.status(400).json({ message: 'Recipient account doesn\'t exist' })

    const updateSender = await Customer.updateOne({ _id: req.user._id }, { bankAccountBalance: newBalance });
    const updateRecipient = await Customer.updateOne(recipientFilter, { bankAccountBalance: recipient.bankAccountBalance + parseInt(req.body.amount) });
    if (updateSender.modifiedCount === 1 && updateRecipient.modifiedCount === 1) {
      res.status(200).json({ id: Date.now() })
    }
  } catch (err) {
    throw new Error(err)
  }
})

export default { transferFunds }