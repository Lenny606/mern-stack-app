import express from "express";
import { getSiteKey } from "../controllers/env.controller.js";

const router = express.Router();

router.get('/sitekey', getSiteKey);

export default router;