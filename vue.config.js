// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require("./api/config");
module.exports = {
  devServer: {
    before: config
  }
};
