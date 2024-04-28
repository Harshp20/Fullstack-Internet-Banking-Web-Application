import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { Customer } from "../models/customerModel.js";
import { generateJwtToken } from "../utils/utils.js";

export const loginCustomer = asyncHandler(async (req, res) => {
  const { email, loginId, password } = req.body;
  if (!((email || loginId) && password)) {
    res.status(400);
    throw new Error("Please provide all credentials.");
  }

  const customer =
    (await Customer.findOne({ email })) ||
    (await Customer.findOne({ loginId }));
  if (customer) {
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (isPasswordValid) {
      res.status(200).json({
        id: customer._id,
        name: customer.name,
        loginId: customer.loginId,
        email: customer.email,
        bankAccountNo: customer.bankAccountNo,
        bankAccountBalance: customer.bankAccountBalance,
        createdAt: customer.createdAt,
        address1: customer.address1,
        address2: customer.address2,
        city: customer.city,
        postcode: customer.postcode,
        state: customer.state,
        country: customer.country,
        token: generateJwtToken(customer._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid password.");
    }
  } else {
    res.status(404);
    throw new Error("Customer does not exist.");
  }
});

export const createNewCustomer = asyncHandler(async (req, res) => {
  console.log(req.body)
  const ifCustomerExists =
    (await Customer.findOne({ email: req.body.email })) ||
    (await Customer.findOne({ loginId: req.body.loginId }));
  if (ifCustomerExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  try {
    const newCustomer = await Customer.create({
      name: req.body.name,
      bankAccountNo: req.body.bankAccountNo,
      bankAccountBalance: req.body.bankAccountBalance,
      loginId: req.body.loginId,
      password: hashedPassword,
      email: req.body.email,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      postcode: req.body.postcode,
      state: req.body.state,
      country: req.body.country,
    });

    if (newCustomer)
      res.status(201).json({
        id: newCustomer._id,
        name: newCustomer.name,
        loginId: newCustomer.loginId,
        email: newCustomer.email,
        bankAccountNo: newCustomer.bankAccountNo,
        bankAccountBalance: newCustomer.bankAccountBalance,
        createdAt: newCustomer.createdAt,
        token: generateJwtToken(newCustomer._id),
      });
  } catch (err) {
    res.status(500);
    throw new Error(err);
  }
});
