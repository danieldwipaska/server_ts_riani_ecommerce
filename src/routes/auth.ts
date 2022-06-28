import express, {Router, Request, Response} from 'express';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.json('This is Auth Route');
});

export {router as authRoute};
