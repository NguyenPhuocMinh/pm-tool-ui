const semver = require('semver');
const packageMeta = require('./package.json');

const versionSupport = semver.minVersion(packageMeta.engines.node).version;

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: versionSupport
        }
      }
    ],
    '@babel/preset-react'
  ],
  plugins: ['@babel/plugin-syntax-dynamic-import']
};
