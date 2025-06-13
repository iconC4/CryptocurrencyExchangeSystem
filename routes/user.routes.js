import express from "express";
import {
    createUser,
    getUserById,
    getUserWallets,
    getUserOrders,
    getUserTransactions,
    getUserSentTransfers,
    getUserReceivedTransfers,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/users", createUser);
router.get("/users/:id", getUserById);
router.get("/users/:id/wallets", getUserWallets);
router.get("/users/:id/orders", getUserOrders);
router.get("/users/:id/transactions", getUserTransactions);
router.get("/users/:id/transfers/sent", getUserSentTransfers);
router.get("/users/:id/transfers/received", getUserReceivedTransfers);

export default router;