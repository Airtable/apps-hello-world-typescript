import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import { readFileSync } from "node:fs";
import https from "node:https";

const port = 3002;
const sslOptions = {
  key: readFileSync('./keys/localhost.key'),
  cert: readFileSync('./keys/localhost.crt'),
};

const app = express();

app.use(cors());
app.use('/api', createProxyMiddleware({
  logger: console,
  target: "http://localhost:3000",
  changeOrigin: true,
}));
app.use('/', createProxyMiddleware({
  secure: false,
  logger: console,
  target: "https://localhost:9000",
  changeOrigin: true,
}));

const httpsServer = https.createServer(sslOptions, app);

httpsServer.listen(port, () => console.log("proxy server starting on port: " + port));
