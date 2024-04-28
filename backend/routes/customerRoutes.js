import express from "express";
import {
  getAllCustomers,
  updateCustomerById,
  deleteCustomerById,
  getCustomerById
} from "../controllers/customerControllers.js";
import authRequired from "../middleware/authMiddleware.js";

const customerRouter = express.Router();

customerRouter.get("/all_customers", getAllCustomers);

customerRouter.get("/customer", authRequired, getCustomerById);

customerRouter.put("/:id", updateCustomerById);

customerRouter.delete("/:id", deleteCustomerById);

export default customerRouter;
