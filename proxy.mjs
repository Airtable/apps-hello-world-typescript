import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

app.use(cors())
app.use(createProxyMiddleware({
  target: "http://localhost:3000",
  changeOrigin: true,
}));

app.listen(3001);
