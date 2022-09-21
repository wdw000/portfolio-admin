const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/admin",
  pages: {
    index: {
      title: "Portfolio Admin",
      entry: "src/main.ts",
    },
  },
});
