import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import { readFileSync, watchFile } from "node:fs";
import { writeFile, readFile } from "node:fs/promises";
import https from "node:https";
import { resolve } from 'node:path';

async function updateEnv() {
  try {
    const data = await readFile(resolve(import.meta.dirname, './env.json'));
    const env = JSON.parse(data);
    const filteredKeys = Object.keys(env).filter((key) => key.startsWith('REACT_APP_'));
    const newData = {};
    for (const key of filteredKeys) {
      newData[key] = env[key];
    }
    await writeFile(resolve(import.meta.dirname, './frontend/env.json'), JSON.stringify(newData));
  } catch (error) {}
}

await updateEnv();
watchFile(resolve(import.meta.dirname, './env.json'), async () => await updateEnv());

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
