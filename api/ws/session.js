/**
 * @type import("express-ws").WebsocketRequestHandler
 */
module.exports = (ws, req, next) => {
  console.log(req.token);
  ws.on("message", data => {
    /**/
  });
  return next();
};
