import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Missing name']
    },
    account_no: {
      type: String,
      required: [true, 'Missing value']
    },
    account_balance: {
      type: Number,
      required: [true, 'Missing value']
    },
    loginId: {
      type: String,
      required: [true, 'Missing value']
    },
    password: {
      type: String,
      required: [true, 'Missing value']
    },
    email: {
      type: String,
      required: [true, 'Missing value']
    },
    address1: {
      type: String,
      required: [true, 'Missing value']
    },
    address2: {
      type: String,
      required: [true, 'Missing value']
    },
    city: {
      type: String,
      required: [true, 'Missing value']
    },
    postcode: {
      type: String,
      required: [true, 'Missing value']
    },
    state: {
      type: String,
      required: [true, 'Missing value']
    },
    country: {
      type: String,
      required: [true, 'Missing value']
    }
}, { timestamps: true })

export const customerModel = mongoose.model('customerModel', customerSchema)