import 'dotenv/config';
import pg from 'pg';
import argon2 from 'argon2';
import express from 'express';
import jwt from 'jsonwebtoken';
import { ClientError, errorMiddleware, authMiddleware } from './lib/index.js';

type Auth = {
  username: string;
  password: string;
};

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

const app = express();
app.use(express.json());

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }

    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "users" ("username", "hashedPassword")
      values ($1, $2)
      returning "createdAt", "userId", "username";
    `;

    const param = [username, hashedPassword];
    const result = await db.query(sql, param);
    const [user] = result.rows;

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/log-in', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }

    const sql = `
      select
        "userId",
        "username",
        "hashedPassword"
      from "users"
      where "username" = $1;
    `;

    const param = [username];

    const result = await db.query(sql, param);
    const user = result.rows[0];

    if (!user) {
      throw new ClientError(401, 'invalid login');
    }

    const validPassword = await argon2.verify(user.hashedPassword, password);

    if (!validPassword) {
      throw new ClientError(401, 'invalid login');
    }

    const payload = {
      userId: user.userId,
      username: user.username,
    };

    const token = jwt.sign(payload, hashKey);

    res.status(200).json({
      user: payload,
      token,
    });
  } catch (err) {
    next(err);
  }
});

app.get('/api/todos', authMiddleware, async (req, res, next) => {
  try {
    const sql = `
      select *
        from "todos"
        where "userId" = $1
        order by "todoId"
    `;
    const result = await db.query(sql, [req.user?.userId]);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.post('/api/todos', authMiddleware, async (req, res, next) => {
  try {
    const { task, isCompleted = false } = req.body;
    if (!task || typeof isCompleted !== 'boolean') {
      throw new ClientError(400, 'task and isCompleted are required');
    }
    const sql = `
      insert into "todos" ("userId", "task", "isCompleted")
        values ($1, $2, $3)
        returning *
    `;
    const params = [req.user?.userId, task, isCompleted];
    const result = await db.query(sql, params);
    const [todo] = result.rows;
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
});

app.put('/api/todos/:todoId', authMiddleware, async (req, res, next) => {
  try {
    const todoId = Number(req.params.todoId);
    if (!Number.isInteger(todoId) || todoId < 1) {
      throw new ClientError(400, 'todoId must be a positive integer');
    }
    const { task, isCompleted } = req.body;
    if (typeof isCompleted !== 'boolean') {
      throw new ClientError(400, 'isCompleted (boolean) is required');
    }
    const sql = `
      update "todos"
        set "updatedAt" = now(),
            "isCompleted" = $1,
            "task" = $2
        where "todoId" = $3 and "userId" = $4
        returning *
    `;
    const params = [isCompleted, task, todoId, req.user?.userId];
    const result = await db.query(sql, params);
    const [todo] = result.rows;
    if (!todo) {
      throw new ClientError(404, `cannot find todo with todoId ${todoId}`);
    }
    res.json(todo);
  } catch (err) {
    next(err);
  }
});

app.post('/api/user-accessibility', authMiddleware, async (req, res, next) => {
  try {
    const { userId, role, permissions } = req.body;
    if (!userId || !role || !permissions) {
      throw new ClientError(400, 'userId, role, and permissions are required');
    }

    const sql = `
      insert into "user_accessibility" ("userId", "role", "permissions")
      values ($1, $2, $3)
      returning *;
    `;
    const params = [userId, role, permissions];
    const result = await db.query(sql, params);
    const [access] = result.rows;
    res.status(201).json(access);
  } catch (err) {
    next(err);
  }
});

app.get('/api/user-accessibility', authMiddleware, async (req, res, next) => {
  try {
    const sql = `
      select "role", "permissions", "createdAt", "updatedAt"
      from "user_accessibility"
      where "userId" = $1;
    `;
    const result = await db.query(sql, [req.user?.userId]);
    if (result.rows.length === 0) {
      throw new ClientError(404, 'No access data found for this user');
    }
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`express server listening on port ${process.env.PORT}`);
});
