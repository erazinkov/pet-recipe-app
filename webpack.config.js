import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/app.js",
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  output: {
    filename: "app_bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
};