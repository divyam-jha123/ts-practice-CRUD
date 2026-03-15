import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { clerkMiddleware } from './middlewares/auth.js';
import router from './routes/notes.js';
import User from './routes/user.js';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URI || '';

const app = express();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.use('/notes', router);
app.use('/user', User);

// connect to db and start the server

async function startServer() {
    await mongoose.connect(MONGO_URL).then(() => {
        console.log('mongoDb is connected...');
    })
    .catch(() => {
        console.log('error while connecting mongoDb')
    })

    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`)
    })
}

startServer();