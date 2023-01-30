import { randomUUID } from "node:crypto";
import http from "node:http";
import { Database } from "./database.js";
import { routes } from "./routes.js";
import { json } from "./middlewares/json.js";

const database = new Database();

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find(
    (route) => route.method === method && route.path === url
  );

  if (!route) return res.writeHead(404).end();

  return route.handler(req, res);
});

server.listen(3333);
