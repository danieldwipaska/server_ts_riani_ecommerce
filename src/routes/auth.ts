import express, { Router, Request, Response } from "express";
import { QueryResult } from "pg";
import { postgresPool } from "../models/postgres.js";

const router: Router = express.Router();

//REGISTER
router.post("/register", async (req: Request, res: Response) => {
  //form checking
  const username: string | undefined = req.body.username;
  const password: string | undefined = req.body.password;
  const isAdmin: boolean | undefined = req.body.isAdmin;
  if (username === undefined || password === undefined || isAdmin === undefined)
    res.status(401).json("Please complete your registration form");

  //insert to database
  try {
    await postgresPool.query(
      "INSERT INTO list_of_users (username, password, is_admin, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW())",
      [username, password, isAdmin]
    );
    res.status(200).json("Register Successful!");
  } catch (err) {
    // console.log("error saat insert ke database");
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req: Request, res: Response) => {
  const username: string | undefined = req.body.username;
  const password: string | undefined = req.body.password;
  if (username === undefined || password === undefined) {
    res.status(401).json("Do not leave username or password blank");
  } else {
    //CHECKING USER DATA
    try {
      const user: QueryResult = await postgresPool.query(
        "SELECT user_id, username, password, is_admin, created_at, updated_at FROM list_of_users WHERE username = $1",
        [username]
      );

      //IF NOT EXIST
      if (user.rowCount === 0) {
        res.status(402).json("Wrong Username");
      } else {
        //IF WRONG PASSWORD
        if (password != user.rows[0].password) {
          res.status(402).json("Wrong Password");
        } else if (password === user.rows[0].password) {
          //IF RIGHT PASSWORD
          const { password, ...userData } = user.rows[0];
          res.status(200).json(userData);
        }
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

export { router as authRoute };
