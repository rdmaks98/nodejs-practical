import express from 'express';
import { loginUser, registerUser } from '../Controller/authController';
import { validateRegistration } from '../Middleware/validate';

const authRoutes = express.Router();

authRoutes.post('/register', validateRegistration, registerUser);
authRoutes.post('/login', loginUser);

export default authRoutes;
