import express, {Router, Request, Response} from 'express';

const router: Router = express.Router();

router.get('/home', (req: Request, res: Response) => {
    res.json('Successful');
});

export {router as authRoute};
