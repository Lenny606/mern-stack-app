import express from "express";
import {createUser} from "../controllers/user.controller.js";

const router = express.Router();

router.post('/', createUser);
// router.delete('/:id', deleteProduct)
// router.put('/:id', updateProduct)
// router.post('/', createProduct)
export default router;