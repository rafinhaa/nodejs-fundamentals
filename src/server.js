import { randomUUID } from "node:crypto";
import http from "node:http";

const users = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (error) {
    req.body = null;
  }

  if (method === "GET" && url === "/users")
    return res
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(users));

  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;
    const newUser = {
      id: randomUUID(),
      name,
      email,
    };
    users.push(newUser);
    return res.writeHead(201).end(JSON.stringify(newUser));
  }

  return res.writeHead(404).end();
});

server.listen(3333);
