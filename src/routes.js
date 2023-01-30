import { randomUUID } from "node:crypto";
import { Database } from "./database.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: "/users",
    handler: (req, res) => {
      const users = database.select("users");

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: "/users",
    handler: (req, res) => {
      const { name, email } = req.body;
      const newUser = {
        id: randomUUID(),
        name,
        email,
      };
      database.insert("users", newUser);

      return res.writeHead(201).end(JSON.stringify(newUser));
    },
  },
  {
    method: "DELETE",
    path: "/users/:id",
    handler: (req, res) => {
      const { name, email } = req.body;
      const newUser = {
        id: randomUUID(),
        name,
        email,
      };
      database.insert("users", newUser);

      return res.writeHead(201).end(JSON.stringify(newUser));
    },
  },
];
