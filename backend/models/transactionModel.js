import mongoose from 'mongoose'

const transactionSchema = mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Missing transaction amount'],
  },
  recipientAccountNo: {
    type: Number,
    required: [true, 'Missing receipient\'s account no.']
  },
}, { timestamps: true })

export const transactionModel = mongoose.model('transactionModel', transactionSchema)