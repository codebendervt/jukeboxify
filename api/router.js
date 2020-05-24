/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const router = express.Router();
const date = require("./date");
router.get("/date", date);
router.use("/spotify", require("./spotify"));
module.exports = router;
