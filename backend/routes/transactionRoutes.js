import { Router } from "express";
import {
  getAllCustomers,
  deleteCustomerById,
  getCustomerById
} from "../controllers/transactionControllers.js";

const customerRouter = Router();

customerRouter.get("/", getAllCustomers);

customerRouter.get("/:id", getCustomerById);

customerRouter.delete("/:id", deleteCustomerById);

export default customerRouter;
