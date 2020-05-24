/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require("path");
const express = require("express");
const history = require("connect-history-api-fallback");
const cookieParser = require("cookie-parser");
const config = require("./config");
const app = express();

const { PORT = 3000 } = process.env;

config(app);

const publicPath = resolve(__dirname, "./dist");
const staticConf = { maxAge: "1y", etag: false };
app.use(history());
app.use(express.static(publicPath, staticConf));
app.use(cookieParser());

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`> Ready On Port ${PORT}`);
});
