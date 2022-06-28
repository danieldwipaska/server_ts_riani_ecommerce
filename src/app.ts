import express, { Express } from 'express';
import { authRoute } from './routes/auth.js';

const app: Express = express();

//MIDDLEWARES
app.use(express.json());

//ROUTES
app.use('/', authRoute);

const port: number = 3000;
app.listen(port, () => {
    console.log(`listening at port ${port}`);
});