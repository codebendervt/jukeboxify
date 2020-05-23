/**
 * @type import("express").RequestHandler
 */
module.exports = (req, res) => {
  res.json({ date: new Date() });
};
