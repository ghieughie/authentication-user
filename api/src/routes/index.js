import express from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bycript from "bcrypt";
import pool from "../utils/db.js";

const routes = express.Router();

// middleware
const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: "No authentication provided.",
    });
  }

  const token = authorization.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  try {
    const jwtDecode = jwt.verify(token, secret);
    req.userData = jwtDecode;
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized!",
    });
  }
  next();
};

routes.post("/me", auth, (req, res) => {
  pool.query(
    `select * from users where id = $1`,
    [req.body.id],
    (dbErr, dbRes) => {
      if (dbErr) throw dbErr;

      const user = dbRes.rows[0];
      const payload = {
        id: user.id,
        name: user.name,
        username: user.username,
      };
      res.json({
        status: true,
        message: "Request berhasil ",
        data: payload,
      });
    }
  );
});

// READ ALL USER
routes.get("/users", auth, (req, res) => {
  pool.query(`select * from users`, [], (dbErr, dbRes) => {
    if (dbErr) throw dbErr;
    res.json({
      status: true,
      message: "Request Berhasil",
      data: dbRes.rows,
    });
  });
});

// SIGNIN
routes.post("/signin", async (req, res) => {
  pool.query(
    `select * from users where username = $1`,
    [req.body.username],
    (dbErr, dbRes) => {
      if (dbErr) throw dbErr;

      const Users = dbRes.rows;
      if (Users.length === 0) {
        res.status(500).json({
          status: false,
          message: "User not found!",
        });
      }
      Users.filter(async (user) => {
        const ispasswordValid = await bycript.compare(
          req.body.password,
          user.password
        );
        if (ispasswordValid) {
          const payload = {
            id: user.id,
            name: user.name,
            username: user.username,
          };
          const secret = process.env.JWT_SECRET;
          const expiresIn = 60 * 60 * 1;
          const token = jwt.sign(payload, secret, { expiresIn: expiresIn });
          res.json({
            status: true,
            message: "Login User berhasil ",
            user: payload,
            token,
          });
        } else {
          res.status(500).json({
            status: false,
            message: "Login User gagal!",
          });
        }
      });
    }
  );
});

// REGISTER
routes.post("/register", async (req, res) => {
  const hashedPassword = bycript.hashSync(req.body.password, 8);
  pool.query(
    `select * from users where username = $1`,
    [req.body.username],
    (dbErr, dbRes) => {
      if (dbErr) throw dbErr;

      const Users = dbRes.rows;
      if (Users.length > 0) {
        res.status(500).json({
          status: false,
          message: "User already exists!",
        });
      } else {
        pool.query(
          ` INSERT INTO users(name, username, password) VALUES ($1,$2,$3)`,
          [req.body.name, req.body.username, hashedPassword],
          (dbErr, dbRes) => {
            if (dbErr) throw dbErr;
            res.json({
              status: true,
              message: "Request Berhasil",
              data: dbRes.rows,
            });
          }
        );
      }
    }
  );
});
export default routes;
