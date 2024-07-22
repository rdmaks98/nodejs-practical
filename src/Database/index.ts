import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { join } from 'path';

// Load environment variables from .env file
dotenv.config({ path: join(__dirname, '../../.env') });

const conectionUrl = process.env.MONGODB_URL as string;

export async function connectToDatabase() {
    try {
        await mongoose.connect(conectionUrl);
        console.log('Connected MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    }
}
