import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import { customerModel } from "../models/customerModel.js";
import { generateJwtToken } from "../utils/utils.js";

export const loginCustomer = asyncHandler(async (req, res) => {
  const { email, loginId, password } = req.body;
  if (!((email || loginId) && password)) {
    res.status(400)
    throw new Error('Please provide all credentials.')
  }

  const customer =
    (await customerModel.findOne({ email })) ||
    (await customerModel.findOne({ loginId }));
  if (customer) {
    const isPasswordValid = await bcrypt.compare(password, customer.password);
    if (isPasswordValid) {
      res.status(201).json({
        id: customer._id,
        name: customer.name,
        loginId: customer.loginId,
        email: customer.email,
        account_no: customer.account_no,
        account_balance: customer.account_balance,
        createdAt: customer.createdAt,
        token: generateJwtToken(customer._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid password.");
    }
  } else {
    res.status(400);
    throw new Error("Customer does not exist.");
  }
});

export const createNewCustomer = asyncHandler(async (req, res) => {
  const ifCustomerExists =
    (await customerModel.findOne({ email: req.body.email })) ||
    (await customerModel.findOne({ loginId: req.body.loginId }));
  if (ifCustomerExists) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newCustomer = await customerModel.create({
    name: req.body.name,
    account_no: req.body.account_no,
    account_balance: req.body.account_balance,
    loginId: req.body.loginId,
    password: hashedPassword,
    email: req.body.email,
    type: req.body.type,
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
      acoount_no: newCustomer.bankAccountNo,
      account_balance: newCustomer.bankAccountBalance,
      createdAt: newCustomer.createdAt,
      token: generateJwtToken(newCustomer._id),
    });
  else {
    res.status(400);
    throw new Error("Could not create a new customer");
  }
});

export const updateCustomerById = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User Updated" });
});