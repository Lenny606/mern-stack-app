import express from "express";
import {createUser, getUsers} from "../controllers/user.controller.js";

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
// router.delete('/:id', deleteProduct)
// router.put('/:id', updateProduct)
// router.post('/', createProduct)
export default router;