/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const router = express.Router();
const date = require("./date");
router.get("/date", date);
module.exports = router;
