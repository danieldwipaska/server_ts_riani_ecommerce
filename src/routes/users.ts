import express, { Router, Request, Response } from "express";
import { QueryResult } from "pg";
import { postgresPool } from "../models/postgres";

const router: Router = express.Router();

//GET A USER BY ID
//returning an array of JSON
router.get("/:id", async (req: Request, res: Response) => {
  const userId: string = req.params.id;
  try {
    const user: QueryResult = await postgresPool.query(
      "SELECT user_id, username, is_admin, created_at, updated_at FROM list_of_users WHERE user_id = $1",
      [userId]
    );
    if (user.rows[0] === undefined || user.rows[0] === null) {
      res.status(401).json("User Not Found");
    } else {
      res.status(200).json(user.rows);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USERS
//returning an array of JSON
router.get("/", async (req: Request, res: Response) => {
  try {
    const users: QueryResult = await postgresPool.query(
      "SELECT user_id, username, is_admin, created_at, updated_at FROM list_of_users"
    );
    res.status(200).json(users.rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE A USER
//returning a JSON

export { router as userRoute };
