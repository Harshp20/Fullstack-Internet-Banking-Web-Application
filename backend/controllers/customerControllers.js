import asyncHandler from "express-async-handler";
import { Customer } from "../models/customerModel.js";

export const getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find();
  res.status(200).json(customers);
});

export const getCustomerById = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

export const updateCustomerById = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User Updated" });
});

export const deleteCustomerById = asyncHandler(async (req, res) => {
  const foundCustomer = await Customer.findById(req.params.id);

  if (!foundCustomer) {
    res.status(400);
    throw new Error("Customer does not exist.");
  }

  await Customer.deleteOne(foundCustomer);
  res.status(200).json(foundCustomer);
});
