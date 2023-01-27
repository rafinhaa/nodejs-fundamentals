import { randomUUID } from "node:crypto";
import http from "node:http";

const users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/users")
    return res
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(users));

  if (method === "POST" && url === "/users") {
    const newUser = {
      id: randomUUID(),
      name: "John Doe",
      email: "johndoe@example.com",
    };
    users.push(newUser);
    return res.writeHead(201).end(JSON.stringify(newUser));
  }

  return res.writeHead(404).end();
});

server.listen(3333);
