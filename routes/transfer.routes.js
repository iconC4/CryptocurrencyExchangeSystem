import express from "express";
import { transfer } from "../controllers/transfer.controller.js";

const router = express.Router();

router.post("/", transfer);

export default router;