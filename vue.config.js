module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:3000/api"
      },
      "^/ws": {
        target: "http://localhost:3000/ws",
        ws: true
      }
    }
  }
};
