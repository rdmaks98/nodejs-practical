import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../Models/User';

export async function changePassword(req: Request, res: Response) {
    const { oldPassword, newPassword } = req.body;

    try {
        // @ts-ignore
        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // comparing password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: 'Incorrect old password' });
        }

        // convert password in hash
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        // @ts-ignore
        user.password = undefined
        res.json({ data: user, statusCode: 200, success: true, message: 'Password changed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
}

export async function getUserDetails(req: Request, res: Response) {
    try {
        // @ts-ignore
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.json({ data: user, statusCode: 200, success: true, message: "user profile get successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
}

export async function getListUserDetails(req: Request, res: Response) {
    try {
        const user = await User.find().select('-password');
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.json({ data: user, statusCode: 200, success: true, message: "users list get successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
}

export function logoutUser(req: Request, res: Response) {
    res.clearCookie('token', {
        httpOnly: true,
        // @ts-ignore
        sameSite: 'Strict'
    });
    res.json({ message: 'Logged out successfully' });
}