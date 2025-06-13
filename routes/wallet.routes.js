import express from "express";
import { getWalletsByUser } from "../controllers/wallet.controller.js";

const router = express.Router();

router.get("/:userId", getWalletsByUser);

export default router;