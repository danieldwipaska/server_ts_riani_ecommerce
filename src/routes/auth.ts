import express, { Router, Request, Response } from 'express';
import { postgresPool } from '../models/postgres';

const router: Router = express.Router();

//REGISTER
router.post('/register', async (req: Request, res: Response) => {
    //form checking
    const username: string | undefined = req.body.username;
    const password: string | undefined = req.body.password;
    const isAdmin: boolean | undefined = req.body.isAdmin;
    if(!username || !password || !isAdmin) res.status(401).json('Please complete your registration form');

    //insert to database
    try {
        await postgresPool.query('INSERT INTO user (username, password, is_admin) VALUES ($1, $2, $3) RETURNING *', [username, password, isAdmin]);
        res.status(200).json('Register Successful!');
    } catch (err) {
        res.status(500).json(err);
    }
});

export {router as authRoute};
