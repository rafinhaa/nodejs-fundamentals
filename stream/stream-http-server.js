import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString());
    const inverse = transformed * -1;
    console.log(inverse);
    const buf = Buffer.from(`${inverse}\n`);
    callback(null, buf);
  }
}

const server = http.createServer((req, res) => {
  return req.pipe(new InverseNumberStream()).pipe(res);
});

server.listen(3334);
