/* eslint-disable @typescript-eslint/no-var-requires */
module.exports = {
  devServer: {
    proxy: {
      "/(api|ws)": {
        target: "http://localhost:3000",
        changeOrigin: true,
        ws: true
      }
    }
  }
};
