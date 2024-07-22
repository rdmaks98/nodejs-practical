import express from 'express';
import { getUserDetails, getListUserDetails, changePassword, logoutUser } from '../Controller/userController';
import { authenticateToken } from '../Middleware/authentication';

const userRoutes = express.Router();

userRoutes.get('/me', authenticateToken, getUserDetails);
userRoutes.get('/dashboard', authenticateToken, getListUserDetails);
userRoutes.post('/change-password', authenticateToken, changePassword);
userRoutes.post('/logout', logoutUser);

export default userRoutes;
