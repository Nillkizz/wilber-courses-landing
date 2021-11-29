module.exports = {
  output: {
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
      { test: /\.css$/, use: "css-loader" },
    ],
  },
  devtool: "source-map",
  mode: "development",
  // mode: 'production',
};
