import asyncHandler from "express-async-handler";
import { customerModel } from "../models/customerModel.js";

export const getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await customerModel.find();
  console.log(req.body);
  console.log(customers);
  res.status(200).json(customers);
});

export const getCustomerById = asyncHandler(async (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "success" });
});

export const deleteCustomerById = asyncHandler(async (req, res) => {
  const foundCustomer = await customerModel.findById(req.params.id);

  if (!foundCustomer) {
    res.status(400);
    throw new Error("Customer does not exist.");
  }

  await customerModel.deleteOne(foundCustomer);
  res.status(200).json(foundCustomer);
});
