/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require("path");
const express = require("express");
const config = require("./api/config");
const app = express();

const { PORT = 3000 } = process.env;

config(app);

const publicPath = resolve(__dirname, "./dist");
const staticConf = { maxAge: "1y", etag: false };
app.use(express.static(publicPath, staticConf));

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`> Ready On Port ${PORT}`);
});
