import dotenv from 'dotenv';
import express, { Express } from 'express';
import cors from 'cors';
import { dbSetUp } from './db/dbSetUp';
import mainRouter from './router/mainRouter';
import { errorHandler } from './middleware/error/errorHandler';

dotenv.config();
const app: Express = express();

dbSetUp();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: ['http://localhost:5173'],
        credentials: true,
    })
);

app.use('/api/campaigns', mainRouter);

app.use(errorHandler);

const SERVER_PORT = process.env.SERVER_PORT;
app.listen(SERVER_PORT, () => {
    console.log(`Server Listening on Port: ${SERVER_PORT}`);
});
