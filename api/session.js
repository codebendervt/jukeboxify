/**
 * @type import("express-ws").WebsocketRequestHandler
 */
module.exports = (ws, req, next) => {
  ws.on("message", data => {
    console.log("socket message", data);
  });
  return next();
};
