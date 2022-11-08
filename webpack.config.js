import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import * as path from 'path';
import {fileURLToPath} from 'url';
import info from './src/info.js';

/**
 * @param {string} format   format name
 * @returns {string}
 */
const getBanner = () => {
  return `HashJs v${info.version}
Copyright (c) ${new Date().getFullYear()} Irmmr
MIT License

https://github.com/irmmr/hash.js`;
}

const modulename = info.module;
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const banner = new webpack.BannerPlugin({
  banner: getBanner()
});

const config = {
  entry: path.resolve(__dirname, "src/hash.js"),
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      extractComments: false
    })]
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [banner]
}

export default function buildData(env) {
  // is dev mode?
  const dev   = env['development'] ?? false;

  // is test mode?
  const test  = env['test'] ?? false;

  // build lab for better test!
  if (test) {
    return Object.assign({}, config, {
      output: {
        path: path.resolve(__dirname, "lab"),
        filename: "hash.js",
        library: modulename,
        libraryTarget: "umd",
        libraryExport: "default"
      },
      mode: "development"
    });
  }

  const outputs = [
    {
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: dev ? 'hash.js' : 'hash.min.js',
        library: modulename,
        libraryTarget: "umd",
        libraryExport: "default"
      }
    }
  ]

  const mode = dev ? 'development' : 'production';
  let fetch = [];

  outputs.forEach(d => {
    fetch.push( Object.assign({}, config, d, { mode }) );
  });

  return fetch;
}