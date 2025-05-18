import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';
const router = express.Router();

// @desc  Register
router.post('/signup', registerUser);

// @desc  Login
router.post('/login', loginUser);

export default router;
