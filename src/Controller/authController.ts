import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../Models/User';
import { generateToken } from '../Utils/generateToken';

export async function registerUser(req: Request, res: Response) {
    const { username, email, password } = req.body;

    try {

        // find already exist user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: `${email} is Already register` });
        }

        // convert password in hash
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({ data: user, statusCode: 200, success: true, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
}

export async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // comparing passsword
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ success: false, error: 'Invalid email or password' });
        }

        // generate by json token
        const token = await generateToken({ id: user._id, username: user.username });
        // Set cookie
        res.cookie('token',
            token, {
            httpOnly: true,
            maxAge: 3600000 // 1 hour
        });
        res.json({ data: user, token, statusCode: 200, success: true, message: "login user" });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server error' });
    }
}