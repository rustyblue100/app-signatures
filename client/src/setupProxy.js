const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/employes",
    createProxyMiddleware({
      target: "http://localhost:5001",
      changeOrigin: true,
    })
  );

  app.use(
    "/users",
    createProxyMiddleware({
      target: "http://localhost:5001",
      changeOrigin: true,
    })
  );
};
