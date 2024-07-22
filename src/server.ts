import * as dotenv from 'dotenv';
import { join } from "path";
import { connectToDatabase } from './Database';
import express, { Request, Response } from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from './Routes/authRoutes';
import userRoutes from './Routes/userRoutes';

// Load environment variables from .env file
dotenv.config({ path: join(__dirname, '../.env') });
const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS for all routes
cookieParser();
app.use(bodyParser.urlencoded({ extended: true }));

// load database in server
connectToDatabase();

// load routing for auth and user
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);


// fetch and log which url request by user
app.use((req: Request, res: Response, next) => {
    console.log('👉 Endpoint: ' + req.originalUrl + `[${req.method}]`);
    next();
});

// listen and run the server
app.listen(process.env.PORT, () => {
    console.log("\n\n");
    console.log(`Server Connected ${process.env.PORT}`);
});
