import { createServer } from "http";
import { parse } from "url";
import app from "../app.js";

export default (req, res) => {
  const server = createServer(app);
  const parsedUrl = parse(req.url, true);

  server.emit("request", req, res);
};
