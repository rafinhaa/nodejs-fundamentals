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
    users.push({
      id: randomUUID(),
      name: "John Doe",
      email: "johndoe@example.com",
    });
    return res.end("Criação de usuários");
  }

  return res.end("Hello World!");
});

server.listen(3333);
